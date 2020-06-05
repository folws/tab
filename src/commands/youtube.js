export const alias = "y";
// Youtube
export const execute = (args) => {
  const url = "https://youtube.com",
    search = "/results?search_query=";
  if (args.length == 0) {
    redirect(url);
  } else {
    if (["subs", "s"].includes(args[0])) redirect(url + "/feed/subscriptions");
    else redirect(buildURL(url, search, args[0]));
  }
};
