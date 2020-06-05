export const name = "gm";
export const execute = (args) => {
  const url = "https://mail.google.com",
    search = "/mail/u/0/#search/";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
