export const name = "dict";
export const execute = (args) => {
  const url = "http://dictionary.com",
    search = "/browse/";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
