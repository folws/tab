export const name = "map";
export const execute = (args) => {
  const url = "https://google.com/maps",
    search = "/search/";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
