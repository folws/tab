import Query from "./query";

const gcal = {
  alias: "gc",
  execute: Query({
    url: "https://calendar.google.com",
  }),
};

const gkeep = {
  alias: ["k", "gk"],
  execute: Query({
    url: "https://keep.google.com",
    search: "/#search/text=",
    seperator: " ",
  }),
};

const gmail = {
  alias: "gm",
  execute: Query({
    url: "https://mail.google.com",
    search: "/mail/u/0/#search/",
    seperator: " ",
  }),
};

const gmaps = {
  aliases: ["gmm", "gmap"],
  execute: Query({
    url: "https://maps.google.com",
    search: "/search/",
    seperator: " ",
  }),
};

const gdrive = {
  alias: "gd",
  execute: Query({
    url: "https://drive.google.com",
    search: "/drive/search?q=",
    seperator: " ",
  }),
};

export { gcal, gkeep, gmail, gmaps, gdrive };
