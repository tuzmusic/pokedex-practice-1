import React from "react";
import "./styles.css";

const BASE_URL = "https://pokeapi.co/api/v2/";
const PAGE_SIZE = 12;
const MAX_PAGES_TO_SHOW = 10;

const urls = {
  // "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
  index: BASE_URL + "pokemon",
};
const idFromPokUrl = (url) => url.split(urls.index).pop().replaceAll("/", "");

function useGetPokemon({ pageNum }) {
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

export default function App() {
  const [pageNum, setPageNum] = React.useState(1);

  const { results: pokemonList, count } = useGetPokemon({
    pageNum: pageNum - 1,
  });

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
              onClick={() => setPageNum(n)}
              style={{
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
