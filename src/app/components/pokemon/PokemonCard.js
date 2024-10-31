"use client";
import pokemonStyles from "./pokemon.module.css";

export default function PokemonCard({ img = "", name = "", types = [] }) {
  const typesJsx = types
    .map(function (typeObj) {
      return typeObj.type.name;
    })
    .join(", ");

  return (
    <div className={pokemonStyles.card}>
      <div>
        <img src={img} />
      </div>
      <div>
        <h4>{name}</h4>
        <p>
          <i>Types: {typesJsx}</i>
        </p>
      </div>
    </div>
  );
}
