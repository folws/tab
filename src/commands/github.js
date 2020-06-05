// GitHub
export const alias = "gh";
export const execute = (args) => {
  const url = "https://github.com",
    search = "/";
  if (args.length == 0) redirect(url);
  else redirect(url + search + args.join(""));
};
