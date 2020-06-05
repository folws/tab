export const alias = "w"
    // Wikipedia
export const execute =      (args) => {
      const url = "https://wikipedia.org",
        search = "/w/index.php?title=Special:Search&search=";
      if (args.length == 0) redirect(url);
      else redirect(buildURL(url, search, args.join(" ")));
    },


