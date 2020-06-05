export const alias = "a";

export const execute = (args) => {
  const url = "https://amazon.com",
    search = "/s/?field-keywords=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
