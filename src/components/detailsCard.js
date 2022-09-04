import React from "react";
import { usePokemon } from "../context/pokemon";

export const DetailsCard = ({ pokemon }) => {
  const { activePokemon, capitalizeFirstLetter, setActivePokemon } =
    usePokemon();

  if (!activePokemon) return null;

  const stats = [
    {
      label: "Type",
      value: activePokemon.types
        .map((type) => capitalizeFirstLetter(type.type.name))
        .join(),
    },
    { label: "Attack", value: activePokemon.stats[1].base_stat },
    { label: "Defense", value: activePokemon.stats[2].base_stat },
    { label: "HP", value: activePokemon.stats[0].base_stat },
    { label: "SP Attack", value: activePokemon.stats[3].base_stat },
    { label: "SP Defense", value: activePokemon.stats[4].base_stat },
    { label: "Speed", value: 65 },
    { label: "Weight", value: activePokemon.weight },
    { label: "Total moves", value: activePokemon.moves.length },
  ];
  return (
    <div className="card-details">
      <button
        className="close-button"
        onClick={() => {
          setActivePokemon(null);
        }}
      >
        Close
      </button>
      <div className="pokemon-img-name">
        <img src={`${activePokemon.sprites.front_default} `} />
        <div className="flex-row ">
          <p>{capitalizeFirstLetter(activePokemon.name)}</p>
          <p>{`#${("00" + activePokemon.id).slice(-3)}`}</p>
        </div>
      </div>
      <table>
        <tbody>
          {stats.map(({ label, value }, i) => {
            return (
              <tr key={i}>
                <th>{label}</th>
                <th>{value}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
