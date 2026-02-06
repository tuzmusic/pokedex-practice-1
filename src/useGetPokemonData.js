import React from "react";
import { idFromPokUrl } from "./urls";

export function useGetPokemonData(pokemonList) {
  const [pokemonData, setPokemonData] = React.useState([]);

  const cache = React.useRef(new Map());

  // todo: make sure pokemonList itself is memoized - or something
  React.useEffect(() => {
    if (!pokemonList) return;

    const promises = pokemonList.map(({ name, url }) => {
      // const id = idFromPokUrl(url);
      // const cached = cache.get(id);
      // if (cached) {
      //   console.log('Used cache for', name)
      //   return Promise.resolve(cached)
      // }

      return fetch(url).then((res) => res.json());
    });

    // todo: allSettled, so one failure doesn't bork it all
    Promise.all(promises).then((results) => {
      console.log(results);
      setPokemonData(results);
    });
  }, [pokemonList]);

  const pokemonMap = React.useMemo(() => {
    console.log("running map...");
    return pokemonData.reduce((acc, item) => {
      acc.set(`${item.id}`, item);
      return acc;
    }, new Map());
  }, [pokemonData]);

  return { pokemonData, pokemonMap };
}
