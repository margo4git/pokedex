import axios from "axios";
import { uniq } from "lodash";
import React, { createContext, useCallback, useContext, useState } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const data = usePokemonData();
  return (
    <PokemonContext.Provider value={data}>{children}</PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=12`
  );

  const [activePokemon, setActivePokemon] = useState(null);
  const [activeType, setActiveType] = useState("all");
  const [types, setTypes] = useState([]);

  const capitalizeFirstLetter = (string = "") => {
    if (!isNaN(string)) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getPokemons = useCallback(async () => {
    try {
      const pokemonsResponse = await axios.get(nextUrl);
      const { results: urlPokemons, next } = pokemonsResponse.data;
      setNextUrl(next);
      const pokemons = await Promise.all(
        urlPokemons.map((pokemonUrl) =>
          axios.get(pokemonUrl.url).then((res) => res.data)
        )
      );
      setTypes((prevTypes) => {
        return uniq([
          "all",
          ...prevTypes,
          ...pokemons.reduce((total, pokemon) => {
            return [...total, ...pokemon.types.map(({ type }) => type.name)];
          }, []),
        ]);
      });
      setPokemons((prevPokemons) => {
        return [...prevPokemons, ...pokemons];
      });
    } catch (err) {
      console.log(err);
    }
  }, [nextUrl]);

  return {
    getPokemons,
    setActivePokemon,
    activePokemon,
    pokemons,
    capitalizeFirstLetter,
    types,
    setActiveType,
    activeType,
  };
};
