export const alias = "r";
// Reddit
export const execute = (args, app) => {
  const url = "https://reddit.com",
    search = "/r/";
  let query = args.length > 0 ? args[0] : "";

  const validSort = (sort) => {
    return [
      "hot",
      "new",
      "rising",
      "controversial",
      "top",
      "gilded",
      "wiki",
      "promoted",
    ].includes(sort);
  };
  const validRange = (range) => {
    return ["day", "week", "month", "year", "all"].includes(range);
  };

  switch (args.length) {
    // Given nothing
    case 0:
      return url;
      break;

    // Given a subreddit
    case 1:
      return app.buildURL(url, search, args[0]);
      break;

    // Given subreddit and sort
    case 2:
      query += validSort(args[1]) ? "/" + args[1] : "";
      return url + search + query;
      break;

    // Given subreddit, sort and range
    case 3:
      if (["top", "controversial"].includes(args[1])) {
        query += validRange(args[2]) ? "/" + args[1] + "?t=" + args[2] : "";
      } else {
        query += validSort(args[1]) ? "/" + args[1] : "";
      }
      return url + search + query;
      break;
  }
};
