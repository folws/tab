// Internet Movie Database
export const name = "imdb";
export const execute = (args) => {
  const url = "http://imdb.com",
    search = "/find?s=all&q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
