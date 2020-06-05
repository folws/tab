export const alias = "k";
export const execute = (args) => {
  const url = "https://keep.google.com",
    search = "/#search/text=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
