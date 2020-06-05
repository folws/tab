export const aliases = ["y", "yt"];

export const execute = (args, app) => {
  const url = "https://youtube.com",
    search = "/results?search_query=";
  if (args.length == 0) {
    return url;
  } else {
    if (["subs", "s"].includes(args[0])) return url + "/feed/subscriptions";
    else return app.buildURL(url, search, args[0]);
  }
};
