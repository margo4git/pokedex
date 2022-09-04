import React from "react";
import { usePokemon } from "../context/pokemon";

export const Dropdown = () => {
  const { types, capitalizeFirstLetter, setActiveType } = usePokemon();
  return (
    <select
      className="dropdown"
      onChange={({ target: { value } }) => {
        setActiveType(value.toLowerCase());
      }}
    >
      {types.map((type, index) => {
        return <option key={index}>{capitalizeFirstLetter(type)}</option>;
      })}
    </select>
  );
};
