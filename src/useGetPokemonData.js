import React from "react";
import { idFromPokUrl } from "./urls";

export function useGetPokemonData(pokemonList) {
  const [pokemonData, setPokemonData] = React.useState([]);

  const cache = React.useRef(new Map());

  // todo: make sure pokemonList itself is memoized - or something
  React.useEffect(() => {
    if (!pokemonList) return;
    let fetched = 0;

    const promises = pokemonList.map(({ url }) => {
      const id = idFromPokUrl(url);
      const cached = cache.current.get(id);
      if (cached) {
        return Promise.resolve(cached);
      }

      fetched++;
      return new Promise((res) => setTimeout(() => res(), 500))
        .then(() => fetch(url))
        .then((res) => res.json())
        .then((item) => {
          cache.current.set(`${item.id}`, item);
          return Promise.resolve(item);
        });
    });
    console.log({ fetched });

    // todo: allSettled, so one failure doesn't bork it all
    Promise.all(promises).then((results) => {
      setPokemonData(results);
    });
  }, [pokemonList]);

  return { pokemonData, pokemonMap: cache.current };
}
