const Query = (query) => {
  const url = query.url;
  const search = query.search;
  const seperator = query.seperator;

  return !url
    ? // return empty function if no url passed
      () => undefined
    : (args, app) => {
        return args.length
          ? app.buildURL(
              url,
              search || "",
              search ? args.join(seperator || app.config.commandSeparator) : ""
            )
          : url;
      };
};

export default Query;
