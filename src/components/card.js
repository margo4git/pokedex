import React, { useEffect } from "react";
import { usePokemon } from "../context/pokemon";

export const Card = ({ pokemon }) => {
  const { setActivePokemon, capitalizeFirstLetter, activePokemon } =
    usePokemon();

  return (
    <div
      className="card-list-item"
      onClick={(e) =>
        setActivePokemon(activePokemon?.id === pokemon.id ? null : pokemon)
      }
    >
      <img src={`${pokemon.sprites.front_default}`} />
      <p>{capitalizeFirstLetter(pokemon.name)}</p>
      <div className="flex-row">
        {pokemon.types.map((type, index) => (
          <span className={`type-color-${type.type.name}`} key={index}>
            {capitalizeFirstLetter(type.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
};
