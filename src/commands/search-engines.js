import Query from "./query";

const google = {
  alias: "g",
  execute: Query({
    url: "https://google.com",
    search: "/search?q=",
  }),
};

const gimg = {
  alias: "img",
  execute: Query({
    url: "https://google.com",
    search: "/search?tbm=isch&q=",
  }),
};

const duckduckgo = {
  aliases: ["ddg", "dg"],
  execute: Query({
    url: "https://duckduckgo.com",
    search: "/?q=",
  }),
};

const qwant = {
  alias: "q",
  execute: Query({
    url: "https://qwant.com",
    search: "/?q=",
  }),
};

const startpage = {
  alias: ["sp"],
  execute: Query({
    url: "https://startpage.com",
    search: "/do/dsearch?query=",
  }),
};

export { google, duckduckgo, qwant, startpage };
