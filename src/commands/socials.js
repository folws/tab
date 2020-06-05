import Query from "./query";

// TODO: port from "reddit.js" - current impl in ./reddit.js
const reddit = {
  alias: "r",
  execute: Query({
    url: "https://reddit.com",
    search: "/search?q=",
  }),
};

// TODO: add tags/user search for ig
const instagram = {
  alias: "ig",
  execute: Query({
    url: "https://instagram.com",
  }),
};

// exclude unfinished reddit query from export
export { instagram };
