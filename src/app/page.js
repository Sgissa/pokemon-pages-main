"use client";
import { useEffect } from "react";
import usePokemonApi from "./hooks/usePokemonApi";
import styles from "./page.module.css";
import PokemonCard from "./components/pokemon/PokemonCard";

export default function Home() {
  const pokeData = usePokemonApi();

  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
    if (!pokeData.randomPokemon.length) {
      pokeData.getRandomPokemon(6);
    }
  }, [pokeData]);

  const randomPokemonListJsx = pokeData.randomPokemon.map(function (pokemon) {
    const quickInfo = pokeData.getPokemonQuickInfo(pokemon);
    return (
      <PokemonCard
        key={`poke-card-${quickInfo.id}`}
        name={quickInfo.name}
        img={quickInfo.img}
        types={quickInfo.types}
      />
    );
  });

  return (
    <main>
      <h1 className={styles.title}>Pokedex Center</h1>
      <section className={styles.container}>{randomPokemonListJsx}</section>
      {/* <div className={styles.reload}>
        <button />
      </div> */}
    </main>
  );
}
