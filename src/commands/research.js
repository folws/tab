import Query from "./query";

const wolframalpha = {
  aliases: ["wolframalpha", "wolfram", "wa"],
  execute: Query({
    url: "http://wolframalpha.com",
    search: "/input/?i=",
    seperator: " ",
  }),
};

const dictionary = {
  aliases: "dict",
  execute: Query({
    url: "https://dictionary.com",
    search: "/browse/",
    seperator: " ",
  }),
};

const thesaurus = {
  execute: Query({
    url: "https://thesaurus.com",
    search: "/browse/",
    seperator: " ",
  }),
};

const wikipedia = {
  execute: Query({
    url: "https://wikipedia.org",
    search: "/w/index.php?title=Special:Search&search=",
    seperator: " ",
  }),
};

export { dictionary, thesaurus, wolframalpha };
