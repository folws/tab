export const name = "img";
export const execute = (args) => {
  const url = "https://google.com",
    search = "/search?tbm=isch&q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
