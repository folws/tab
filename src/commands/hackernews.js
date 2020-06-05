// Hacker News
export const alias = "hn";

export const execute = (args) => {
  const url = "https://news.ycombinator.com";
  if (args.length == 0) {
    return url;
  } else {
    switch (args[0]) {
      case "new":
        return url + "/newest";

      case "comments":
        return url + "/newcomments";

      case "show":
        return url + "/show";

      case "ask":
        return url + "/ask";

      case "jobs":
        return url + "/jobs";

      case "submit":
        return url + "/submit";
    }
  }
};
