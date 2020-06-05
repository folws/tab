export const alias = "tr";
export const execute = (args) => {
  const url = "https://trello.com",
    search = "/search?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
