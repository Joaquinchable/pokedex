import React from "react";
import Pokemon from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons, loading, reset } = props;

  return (
    <div>
      {loading ? (
        <div>Buscando pokemon</div>
      ) : (
        <div>
          {pokemons.map((pokemon, idx) => {
            return (
              <>
                <Pokemon pokemon={pokemon} key={pokemon.name} />
                <button className="reset" onClick={reset}>
                  Reset
                </button>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
