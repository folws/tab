// Netflix
export const alias = "n";
export const execute = (args) => {
  const url = "https://netflix.com",
    search = "/search?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
