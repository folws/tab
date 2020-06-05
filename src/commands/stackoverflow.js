export const alias = "so";
export const execute = (args) => {
  const url = "https://stackoverflow.com",
    search = "/search?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
