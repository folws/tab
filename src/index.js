import "./style.css";
import * as commands from "./commands";

const LOCAL_STORAGE_KEY = "taabSettings";

const MESSAGE_ID = "#message";
const CLOCK_ID = "#clock";
const INPUT_ID = "#input";

const DEFAULT_CONFIG = {
  // key: value
  defaultCommand: "ddg",
  bgColor: "#1b1d1e",
  textColor: "#ebdbb2",
  fontSize: "1.75em",
  clockSize: "2em",
  showClock: false,
  militaryClock: false,
  alwaysNewTab: false,
  gistID: "",
  links: [],
  useLegacyParser: false,
  commandSeparator: ";",
};

function checkIfURL(url) {
  return (
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
      url
    ) && !url.includes(" ")
  );
}

/*
 * Adds protocol if not present, encodes search string
 */
function buildURL(url, search = "", query = "") {
  return (
    (/(http(s)?:\/\/.)/.test(url) ? url : "http://" + url) +
    search +
    encodeURIComponent(query)
  );
}

class Messager {
  constructor(defaultTimeout) {
    this.messageTimer = null;
    this.msgDiv = document.querySelector(MESSAGE_ID);
    this.defaultTimeout = defaultTimeout || 5000;
  }

  display(msg, timeMs) {
    // Clear existing message
    this.clear();

    // Display message
    this.msgDiv.innerHTML = msg;

    // Set timer
    this.messageTimer = setTimeout(
      this.clear.bind(this),
      timeMs || this.defaultTimeout
    );
  }

  clear() {
    // Clear existing timer
    if (this.messageTimer) clearTimeout(this.messageTimer);

    this.msgDiv.innerHTML = "";
  }
}

class App {
  displayMessage(message) {
    return this.message.display(message);
  }

  clearMessage() {
    return this.message.clear();
  }

  constructor() {
    this.config = {};
    this.aliases = {};
    this._message = new Messager();

    this.registerCommands();

    // debug
    // console.log(this.commands);
    // console.log(this.aliases);

    this.reloadConfig();

    this.createEventListeners();
    this.updateClock();
  }

  reloadConfig() {
    this.loadConfig();
    this.applyConfig();
    this.saveConfig();
  }

  registerCommands() {
    const runners = {};

    for (let key of Object.keys(commands)) {
      const command = commands[key];
      const name = command.name || key;

      if (name in runners)
        return console.log(
          `Error: tried to load a commands with duplicate name '${name}' from '${key}'.`
        );

      runners[name] = command.execute;
      this.registerAliases(name, command.aliases || command.alias);
    }

    this.commands = runners;
  }

  registerAliases(command, aliases) {
    if (!aliases) return;
    aliases = aliases instanceof Array ? aliases : [aliases];
    for (let alias of aliases)
      if (this.aliases[alias])
        console.log(
          `Error: duplicate alias '${alias}' found for '${this.aliases[alias]}' & '${command}.'`
        );
      else this.aliases[alias] = command;
  }

  /*
   * Load config from localStorage.
   */
  loadConfig() {
    let config;

    if (Storage) {
      // Proceed if storage supported
      if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null)
        config = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); // load saved config from localStorage if it exists.

      // 06-05-2020 add commandSeparator if not seen
      if (!config.commandSeparator)
        config.commandSeparator = DEFAULT_CONFIG.commandSeparator;

      // Legacy import
      if (localStorage.getItem("customCommands") !== null) {
        this.importLegacyLinks();
        localStorage.removeItem("customCommands");
      }
    }

    this.config = Object.assign({}, config || DEFAULT_CONFIG);
  }

  /*
   * Update app with config values.
   */
  applyConfig() {
    // Text and background colors
    document.body.style.backgroundColor = this.config.bgColor;
    document.body.style.color = this.config.textColor;
    document.body.style.fontSize = this.config.fontSize;

    // Clock
    const clock = document.querySelector(CLOCK_ID);
    clock.style.fontSize = this.config.clockSize;
    clock.style.display = this.config.showClock ? "inline" : "none";
  }

  /*
   * Write config to localStorage
   */
  saveConfig() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.config));
  }

  createEventListeners() {
    this.focusInput();

    document.querySelector("body").addEventListener("click", this.focusInput);
    document.onkeydown = this.handleKeyDown.bind(this);
  }

  /*
   * Focus on input box
   */
  focusInput() {
    document.querySelector(INPUT_ID).focus();
  }

  handleKeyDown(e) {
    const keycode = e.which || e.keyCode;

    switch (keycode) {
      case 13:
        // Enter key
        this.evaluateInput();
        break;

      case 38:
        // Up arrow
        /*
         * Replace input text with last entered command
         */
        if (!this.lastEnteredCommand) return;

        let input = document.querySelector("#input");
        input.focus();
        input.value = this.lastEnteredCommand;
        // Put cursor at end of text
        setTimeout(
          () => input.setSelectionRange(input.value.length, input.value.length),
          2
        );
    }
  }

  updateClock() {
    const d = new Date();
    let h = d.getHours();

    if (!this.config.militaryClock && h > 12) h -= 12;

    const hours = h.toString();
    const minutes = ("0" + d.getMinutes()).slice(-2);

    document.querySelector(CLOCK_ID).innerText = `${hours}:${minutes}`;

    setTimeout(this.updateClock.bind(this), 1000);
  }

  evaluateInput() {
    const input = document.querySelector("#input").value.trim();
    document.querySelector("#input").value = "";

    this.clearMessage();

    // Input is empty
    if (input === "") return;

    // Save one-line history
    this.lastEnteredCommand = input;

    // Format input
    const args = input
      .split(this.config.commandSeparator)
      .map((arg) => arg.trim());
    let command = args[0].toLowerCase();
    let inNewTab = false;

    // Check for newtab flag
    if (args[args.length - 1] === "n") {
      inNewTab = true;
      args.pop(); // remove newtab flag
    }

    let runner = this.findCommandRunner(command);
    if (!runner) {
      // if command does not exist or is not alias:

      // check if command is link shortcut
      const link = this.config.links.find((link) => link.command == command);
      if (link) {
        return this.redirect(
          link.url + (args.length == 0 ? link.search + args.join(" ") : "")
        );
      }

      // check i command is a url and redirect
      if (args.length == 1 && checkIfURL(args[0]))
        return this.redirect(buildURL(command), inNewTab);

      runner = this.defaultRunner;
    } else {
      // remove command from arg list
      args.shift();
    }

    this.redirect(runner(args, this), inNewTab);
  }

  findCommandRunner(command) {
    // Check if command is alias
    if (command in this.aliases) command = this.aliases[command];

    return this.commands[command]; // Return command runner if command is valid
  }

  /*
   * Opens a URL either in current or new tab
   */
  redirect(url, inNewTab) {
    if (!url) return;

    if (this.alwaysNewTab || inNewTab) window.open(url, "_blank").focus();
    else window.location.href = url;
  }

  importConfigFromGist(configString, gist) {
    let config;
    try {
      config = JSON.parse(configString);
    } catch (err) {
      this.message.display("Error parsing config, see console for details");
      console.log(err);
      return;
    }

    for (let setting in config) this.config[setting] = config[setting];

    this.config.gistID = gist;

    saveConfig();
    applyConfig();

    this.message.display("Config imported");
  }

  // Get full link object from its shortcut
  getFullLink(shortcut) {
    for (let i = 0; i < this.config.links.length; i++) {
      if (shortcut == this.config.links[i].command) {
        return this.config.links[i];
      }
    }
    return null;
  }

  // Import legacy links (custom commands)
  importLegacyLinks() {
    const legacyLinks = JSON.parse(localStorage.getItem("customCommands"));
    if (legacyLinks) {
      this.config.links = legacyLinks;
      saveConfig();
    }
  }

  get LOCAL_STORAGE_KEY() {
    return LOCAL_STORAGE_KEY;
  }

  static get DEFAULT_CONFIG() {
    return DEFAULT_CONFIG;
  }

  get buildURL() {
    return buildURL;
  }

  static get MESSAGE_ID() {
    return MESSAGE_ID;
  }

  static get INPUT_ID() {
    return INPUT_ID;
  }

  static get CLOCK_ID() {
    return CLOCK_ID;
  }

  get message() {
    return this._message;
  }

  get alwaysNewTab() {
    return this.config.alwaysNewTab;
  }

  get defaultRunner() {
    return (
      this.findCommandRunner(this.config.defaultCommand) ||
      // this.findCommandRunner(DEFAULT_CONFIG.defaultCommand) ||
      function () {
        this.displayMessage(
          `Could not find runner for defaultCommand '${this.defaultCommand}'`
        );
        // use the first runner found.
        return this.commands(Object.keys(this.commands)[0]);
      }.bind(this)()
    );
  }
}

document.addEventListener("DOMContentLoaded", () => new App());
