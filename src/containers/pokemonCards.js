import { chunk } from "lodash";
import React, { useEffect, useMemo } from "react";
import { Card } from "../components/card";
import { Dropdown } from "../components/dropdown";
import { usePokemon } from "../context/pokemon";

export const PokemonCards = () => {
  const { getPokemons, pokemons, activeType } = usePokemon();

  useEffect(() => {
    getPokemons();
  }, []);

  const actualPokemons = useMemo(() => {
    if (activeType === "all") return pokemons;
    return pokemons.filter((pokemon) =>
      pokemon.types.map(({ type }) => type.name).includes(activeType)
    );
  }, [pokemons, activeType]);

  return (
    <div className="card-list-load-more">
      <Dropdown />
      <div className="card-list">
        {actualPokemons.map((pokemon, index) => {
          return <Card pokemon={pokemon} key={index} />;
        })}
      </div>
      {activeType === "all" && (
        <div className="load-more">
          <button onClick={() => getPokemons()}>Load More</button>
        </div>
      )}
    </div>
  );
};
