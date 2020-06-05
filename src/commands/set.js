export const alias = "setting";

/*
 * Validate hex color values.
 * #EBEBEB is valid, EBEBEB is not. #FFF is valid shorthand.
 */
const validHex = (hex) => /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(hex);

// TODO: refractor duplicate code & remove magic numbers
export function execute(args, app) {
  const displayMessage = app.displayMessage.bind(app);

  if (args.length == 0 || args[0] === "")
    return displayMessage("No setting passed. type '?' for help.");

  switch (args[0].toLowerCase()) {
    // command separator
    case "separator":
    case "sep":
      // Display current separator if none given
      if (args.length == 1) {
        const sep = app.config.commandSeparator;
        displayMessage(`Command seperator: '${sep === " " ? "<space>" : sep}'`);
        return;
      }

      const sep = args[1] == "<space>" ? " " : args[1];
      if (sep === "" || sep.length > 1)
        return displayMessage(
          `Error: command seperator '${sep}' is not valid; seperator not changed.`
        );

      app.config.commandSeparator = sep;

      displayMessage(`Set command seperator to '${args[1]}'`, 3000);
      break;

    // Default command
    case "dc":
    case "defaultCommand":
      // Display current value if none given
      if (args.length === 1) {
        displayMessage(`Default command: ${app.config.defaultCommand}`);
        return;
      }

      // Check if existant command or alias
      if (!app.findCommandRunner(args[1]))
        return displayMessage(
          `Error: command '${args[1]}' not found; default command not changed`,
          10000
        );

      app.config["defaultCommand"] = args[1];
      displayMessage(`Set default command to ${args[1]}`, 3000);
      break;

    // Background color
    case "bgColor":
    case "background":
      // Display current value if none given
      if (args.length === 1)
        return displayMessage(
          `Current background color: ${app.config.bgColor}`,
          8000
        );

      if (!args[1].startsWith("#")) args[1] = "#" + args[1];
      if (!validHex(args[1])) return displayMessage("Error: invalid hex value");

      // Set new background color
      app.config.bgColor = args[1];
      break;

    // Text color
    case "textColor":
      // Display current value if none given
      if (args.length === 1) {
        displayMessage(
          `Current background color: ${app.config.textColor}`,
          8000
        );
        return;
      }

      // Set new text color
      if (!validHex(args[1])) return displayMessage("Error: invalid hex value");

      app.config["textColor"] = args[1];
      break;

    // Font size
    case "fontSize":
      // Display current setting
      if (args.length === 1) {
        displayMessage(`Current input font size: ${app.config.fontSize}`, 8000);
        return;
      }

      // Set new value
      if (args[1]) app.config["fontSize"] = args[1];
      break;

    case "clockSize":
      // Display current setting
      if (args.length === 1) {
        displayMessage(
          `Current clock font size: ${app.config.clockSize}`,
          8000
        );
        return;
      }

      // Set new value
      if (args[1]) app.config["clockSize"] = args[1];
      break;

    // Always new tab
    case "newtab":
    case "alwaysNewTab":
      // Display current value if none given
      if (args.length === 1) {
        displayMessage(
          `alwaysNewTab is ${app.config.alwaysNewTab ? "on" : "off"}`
        );
        return;
      }

      if (args[1] === "on") app.config.alwaysNewTab = true;
      else if (args[1] === "off") app.config.alwaysNewTab = false;
      else return displayMessage("Must be set to either 'on' or 'off'");
      break;

    // Clock
    case "clock":
      // Display current value if none given
      if (args.length === 1) {
        displayMessage(
          `Clock is ${app.config.showClock ? "on" : "off"},
            ${app.config.militaryClock ? "24" : "12"}-hour`,
          5000
        );
        return;
      }

      // Set on/off, 12/24 hour
      switch (args[1]) {
        case "on":
          app.config.showClock = true;
          break;
        case "off":
          app.config.showClock = false;
          break;
        case "12":
          app.config.militaryClock = false;
          break;
        case "24":
          app.config.militaryClock = true;
          break;
        default:
          displayMessage("Must be set to 'on', 'off', '12' or '24'");
      }
      break;

    // Restore defaults
    case "defaults":
      app.removeConfigFromStorage();
      app.reloadConfig();
      displayMessage("Settings reset to defaults");
      return;

    default:
      displayMessage(`'${args[0]}' is not a valid setting`);
      return;
  }

  app.applyConfig();
  app.saveConfig();
}
