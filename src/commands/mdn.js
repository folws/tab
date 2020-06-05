export const execute = (args) => {
  const url = "https://developer.mozilla.org",
    search = "/search?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
