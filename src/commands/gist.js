// GitHub Gist
export const execute = (args) => {
  const url = "https://gist.github.com",
    search = "/";
  if (args.length == 0) redirect(url);
  else redirect(url + search + args.join(""));
};
