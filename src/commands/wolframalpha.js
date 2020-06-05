// Wolfram Alpha
export const aliases = ["wolframalpha", "wolfram", "wa"];
export const execute = (args) => {
  const url = "http://wolframalpha.com",
    search = "/input/?i=";
  if (args.length == 0) redirect(url);
  else redirect(buildURL(url, search, args.join(" ")));
};
