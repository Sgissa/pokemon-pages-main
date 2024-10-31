"use client";
import styles from "./favs.module.css";
import usePokemonApi from "../hooks/usePokemonApi";

export default function Favorites() {
  const { getFavorites, removeFromFavorites } = usePokemonApi();
  const favorites = getFavorites();

  return (
    <main>
      <h1 className={styles.title}>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((pokemon) => (
            <li key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <button onClick={() => removeFromFavorites(pokemon.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet!</p>
      )}
    </main>
  );
}
