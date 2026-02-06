import React from "react";

export function useGetPokemonData(pokemonList) {
  const [pokemonData, setPokemonData] = React.useState([]);

  // todo: make sure pokemonList itself is memoized - or something
  React.useEffect(() => {
    if (!pokemonList) return;

    const promises = pokemonList.map(({ url }) =>
      fetch(url).then((res) => res.json())
    );

    // todo: allSettled, so one failure doesn't bork it all
    Promise.all(promises).then((results) => {
      console.log(results);
      setPokemonData(results);
    });
  }, [pokemonList]);
}
