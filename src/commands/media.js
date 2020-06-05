import Query from "./query";
import * as youtube from "./youtube";

// Internet Movie Database
const imdb = {
  execute: Query({
    url: "http://imdb.com",
    search: "/find?s=all&q=",
  }),
};

const netflix = {
  execute: Query({
    url: "https://netflix.com",
    search: "/search?q=",
    seperator: " ",
  }),
};

export { imdb, youtube, netflix };
