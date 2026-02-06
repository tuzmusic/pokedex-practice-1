import { urls } from "./urls";
import React from "react";
import { PAGE_SIZE } from "./App";

export function useGetPokemonList({ pageNum }) {
  const [result, setPokemonList] = React.useState([]);

  const cache = React.useRef(new Map());

  React.useEffect(() => {
    const url = new URL(urls.index);
    url.searchParams.set("limit", PAGE_SIZE);
    url.searchParams.set("offset", PAGE_SIZE * pageNum);

    const cached = cache.current.get(pageNum);
    if (cached) {
      setPokemonList(cached);
      console.log("read from cache for page", pageNum);
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        debugger;
        cache.current.set(pageNum, data);
        setPokemonList(data);
        console.log("wrote to cache for page", pageNum);
      });
  }, [setPokemonList, pageNum]);

  return result;
}
