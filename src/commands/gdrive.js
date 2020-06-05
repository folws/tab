export const aliases = ["gd", "gdrive"];
export const execute = (args) => {
  const url = "https://drive.google.com",
    search = "/drive/search?q=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
