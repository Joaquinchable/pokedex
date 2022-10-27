import React, { useState, useEffect } from "react";
import "./assets/styles.css";
import Pokedemg from "./assets/pokedex.png";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./data/api";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [start, setStart] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const [dis, setDis] = useState(true);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(-1, 1 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
    }
    setLoading(false);
    setSearching(false);
  };
  return (
    <div className="App">
      <div className="ContainerImg">
        <img src={Pokedemg} alt="pokedeximg" />
      </div>
      {start === true ? (
        <>
          <Searchbar onSearch={onSearch} />
          {notFound ? (
            <div className={`${dis == false ? "displaNone" : "diserr"}`}>
              <p>No se puede encontrar ese Pokemon</p>
              <button
                className="reset"
                onClick={() => (setStart(false), setDis(false))}
              >
                Reset
              </button>
            </div>
          ) : (
            <>
              <Pokedex
                loading={loading}
                pokemons={pokemons}
                page={page}
                setPage={setPage}
                reset={() => (setStart(false), setPokemons([]))}
              />
            </>
          )}
        </>
      ) : (
        <button className="StartBtn" onClick={() => setStart(true)}>
          Start
        </button>
      )}
    </div>
  );
};

export default App;
