"use client";
import { useState } from "react";
import Styles from "./search.module.css";
import usePokemonApi from "../hooks/usePokemonApi";

export default function Search() {
  const { searchPokemon, searchResult, addToFavorites } = usePokemonApi();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    searchPokemon(query);
  };

  return (
    <main>
      <h1 className={Styles.title}>Pokemon Finder</h1>
      <div className={Styles.textbox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Pokémon name, egg group, or habitat"
          className={Styles.input}
        />
        <button onClick={handleSearch} className={Styles.button}>
          Search
        </button>
      </div>

      {searchResult ? (
        (() => {
          if (searchResult.type === "name") {
            return (
              <div className={Styles.display}>
                <div className={Styles.displayBlock}>
                  <h2>{searchResult.name}</h2>
                  <img src={searchResult.imageUrl} alt={searchResult.name} />
                  <p>Types: {searchResult.types.join(", ")}</p>
                  <button onClick={() => addToFavorites(searchResult)}>
                    Add to Favorites
                  </button>
                </div>
              </div>
            );
          } else if (searchResult.type === "egg-group") {
            return (
              <div className={Styles.eggContainer}>
                <div className={Styles.eggcontent}>
                  <h2>Egg Group: {searchResult.eggGroup}</h2>
                  <ul>
                    {searchResult.pokemon.map((pokemonName) => (
                      <li key={pokemonName}>{pokemonName}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          } else if (searchResult.type === "habitat") {
            return (
              <div className={Styles.eggContainer}>
                <div className={Styles.eggcontent}>
                  <h2>Habitat: {searchResult.habitat}</h2>
                  <ul>
                    {searchResult.pokemon.map((pokemonName) => (
                      <li key={pokemonName}>{pokemonName}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          } else {
            return <p>No results found.</p>;
          }
        })()
      ) : (
        <p>No results found.</p>
      )}
    </main>
  );
}
