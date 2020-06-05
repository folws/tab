function fetchGist(gistID, app) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/gists/${gistID}`;

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const files = JSON.parse(xhr.responseText).files;
      if (files.length > 1) {
        app.message.display(
          "Error: Multiple files found in gist. Please use a gist with only one file."
        );
        return;
      }
      const gistText = files[Object.keys(files)[0]].content;
      app.importConfigFromGist(gistText, gistID);
    }
  };

  xhr.open("GET", url, true);
  xhr.send(null);
}

export const execute = (args, app) => {
  const displayMessage = app.displayMessage.bind(app);
  const config = app.config;

  switch (args[0]) {
    case "export":
      // Display config as string and select all of it
      displayMessage(localStorage.getItem(app.LOCAL_STORAGE_KEY), 1000 * 25);
      window
        .getSelection()
        .selectAllChildren(document.querySelector(app.MESSAGE_ID));
      break;

    case "import":
      app.importConfigFromGist(args[1]);
      break;

    case "open":
      if (config.gistID !== "")
        app.findCommandRunner("gist")([app.config.gistID]);
      else
        displayMessage(
          "Error: No gist ID found. Make sure you have fetched your config at least once.",
          8000
        );

      break;

    case "fetch":
      let gistID;
      if (args.length > 1) {
        try {
          gistID = args[1].match(/([0-9A-Za-z]{32})/)[0];
        } catch (err) {
          displayMessage(
            "Error: unable to parse gist ID.<br>Try entering just the 32 character ID string.",
            8000
          );
          return;
        }
      } else if (config.gistID != undefined) {
        gistID = config.gistID;
      } else {
        displayMessage("Error: no gist ID", 5000);
        break;
      }

      displayMessage("Fetching gist...", 2500);
      fetchGist(gistID, app);
      break;
  }
};
