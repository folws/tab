export const alias = "thes";
export const execute = (args) => {
  const url = "http://thesaurus.com",
    search = "/browse/";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
