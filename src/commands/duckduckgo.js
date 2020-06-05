export const aliases = ["dg", "ddg"];

export const execute = (args) => {
  const url = "https://duckduckgo.com",
    search = "/?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args));
};
