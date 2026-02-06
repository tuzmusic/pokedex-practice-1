import { idFromPokUrl } from "./urls";
import React from "react";
import "./styles.css";
import { useGetPokemonList } from "./useGetPokemonList";
import { useGetPokemonData } from "./useGetPokemonData";
export const PAGE_SIZE = 12;
export const MAX_PAGES_TO_SHOW = 10;

export default function App() {
  const [pageNum, setPageNum] = React.useState(1);

  const { results: pokemonList, count } = useGetPokemonList({
    pageNum: pageNum - 1,
  });

  useGetPokemonData(pokemonList);

  const pagesCount = Math.ceil(count / PAGE_SIZE);

  const canIncrement = pageNum < pagesCount;
  const canDecrement = pageNum > 1;
  const decPage = () => {
    if (canDecrement) setPageNum((p) => p - 1);
  };
  const incPage = () => {
    if (canIncrement) setPageNum((p) => p + 1);
  };

  // todo: don't show pages above pageCount
  const pages = Array.from(
    { length: MAX_PAGES_TO_SHOW },
    (_, i) => pageNum + i
  );

  return (
    <div className="App">
      <h1>Pokemon</h1>

      <nav>
        <button disabled={!canDecrement} onClick={decPage}>
          prev
        </button>
        {pages.map((n) => {
          return (
            <a
              key={n}
              onClick={() => setPageNum(n)}
              style={{
                // todo: put into css
                cursor: "pointer",
                paddingInline: "4px",
                borderColor: "grey",
                borderWidth: "1px",
                borderStyle: n === pageNum ? "solid" : "none",
              }}
            >
              {n}
            </a>
          );
        })}
        of {pagesCount}
        <button disabled={!canIncrement} onClick={incPage}>
          next
        </button>
      </nav>

      <ol>
        {pokemonList?.map((pok) => {
          const id = idFromPokUrl(pok.url);
          return <Pokemon key={id} id={id} pokemon={pok} />;
        })}
      </ol>
      <nav></nav>
    </div>
  );
}

function Pokemon({ pokemon, id }) {
  return (
    <li value={id}>
      <span className="pokemonName">{pokemon.name}</span> ({pokemon.url})
    </li>
  );
}
