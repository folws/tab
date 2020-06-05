export const name = "link";

export const execute = (args) => {
  switch (args.length) {
    case 0:
      app.displayMessage(
        `link is a builtin command<br>To search for "link" try g;link<br>`,
        8000
      );
      return;

    case 1:
      // Show all links
      if (args[0] === "show") {
        const msg = app.config.links
          .map(
            (link) =>
              `${link.command} --> ${link.url}` +
              (link.search !== "" ? ` (${link.search})` : "")
          )
          .join("<br>");
        app.displayMessage(msg, 30000);
      } else {
        // Show specific (existent) link
        const link = app.getFullLink(args[0]);
        if (link) {
          let msg = `"${args[0]}" links to ${link.url}`;
          if (link.search !== "") msg += ` (${link.search})`;
          app.displayMessage(msg, 10000);
        } else
          return app.displayMessage(`Error: No link for '${args[0]}' found.`);
      }

      break;

    case 2:
    case 3:
      // Delete
      if (args[1] === "delete") {
        for (let i = 0; i < app.config.links.length; i++) {
          if (args[0] == app.config.links[i].command) {
            app.config.links.splice(i, 1);
            app.displayMessage(`Link ${args[0]} deleted`);
          }
        }
      }

      // Add new
      else {
        // Ensure shortcut not taken
        for (let i = 0; i < app.config.links.length; i++) {
          if (app.config.links[i].command == args[0]) {
            // Already using this shortcut, override?
            if (confirm("Overwrite existing shortcut?")) {
              // Remove existing shortcut if user says yes to avoid duplicate link commands
              for (let i = 0; i < app.config.links.length; i++) {
                if (app.config.links[i].command == args[0]) {
                  app.config.links.splice(i, 1);
                }
              }
            } else {
              // Do nothing if user says no
              return;
            }
          }
        }
        if (app.findCommandRunner(args[0])) {
          app.displayMessage(`Cannot override builtin command: ${args[0]}`);
          return;
        }

        // Check that URL is valid
        let url = app.buildURL(args[1]);
        if (app.checkIfURL(url)) {
          app.config.links.push({
            command: args[0],
            url: url,
            search: args[2] || "",
          });
        } else {
          app.displayMessage("Invalid URL");
          return;
        }
      }

      break;
  }

  app.saveConfig();
};
