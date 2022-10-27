import React from "react";
const Pokemon = (props) => {
  const { pokemon } = props;
  const array = pokemon.moves;
  const moves = array.length;

  return (
    <div className="pokemon-card">
      <div className="pokemon-img-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-img"
        />
        <div className="nameMoveBox">
          <h3> {pokemon.name.toUpperCase()}</h3>
          <h3>Moves:{moves}</h3>
        </div>
      </div>
      <div className="card-body">
        <div className="tabla">
          <p>Experiencia:{pokemon.base_experience}</p>

          <p>Altura: {pokemon.height}</p>
          <p>Peso:{pokemon.weight}</p>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
