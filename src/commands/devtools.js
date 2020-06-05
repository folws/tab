import Query from "./query";
import * as hackernews from "./hackernews";

const stackoverflow = {
  alias: "so",
  execute: Query({
    url: "https://stackoverflow.com",
    search: "/search?q=",
    seperator: " ",
  }),
};

const github = {
  alias: "gh",
  execute: Query({
    url: "https://github.com",
    search: "/",
  }),
};

const pypi = {
  execute: Query({
    url: "https://pypi.org",
    search: "/search?q=",
    seperator: " ",
  }),
};

const npm = {
  execute: Query({
    url: "https://npmjs.org",
    search: "/search?q=",
    seperator: " ",
  }),
};

const mdn = {
  execute: Query({
    url: "https://developer.mozilla.org",
    search: "/search?q=",
    seperator: " ",
  }),
};

export { stackoverflow, github, hackernews, mdn };
