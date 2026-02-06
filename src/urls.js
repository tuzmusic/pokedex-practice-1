const BASE_URL = "https://pokeapi.co/api/v2/";

export const urls = {
  // "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
  index: BASE_URL + "pokemon",
};

export const idFromPokUrl = (url) =>
  url.split(urls.index).pop().replaceAll("/", "");
