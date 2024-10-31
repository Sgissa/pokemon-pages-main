"use client";
import { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemonState, setPokemonState] = useState({
    totalPokemonCount: 0,
    randomPokemonImages: [],
    randomPokemon: [],
    searchResult: null,
    favorites: [],
  });
  /**
   * Fetches the pokemon api with a limit of 1 to minimize api call time. Uses count returned to determine the total number of pokemon stored on the api.
   **/

  async function getNumberOfPokemon() {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1`
    );
    const { count: pokemonCount } = await pokeRequest.json();
    setPokemonState({ ...pokemonState, totalPokemonCount: pokemonCount });
  }

  async function getRandomPokemon(limit = 9) {
    if (!pokemonState.totalPokemonCount) return [];
    const pokemonIds = {};
    let pokeIndex = 0;

    while (pokeIndex < limit) {
      const randId =
        parseInt(Math.random() * pokemonState.totalPokemonCount) + 1;

      if (!pokemonIds[randId]) {
        let idToUse = randId;
        if (idToUse > 1000) {
          idToUse = "10" + String(idToUse).slice(1);
        }

        const pokeRequest = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randId}`
        );
        const pokeData = await await pokeRequest.json();
        pokemonIds[randId] = pokeData;

        pokeIndex++;
      }
    }

    setPokemonState({
      ...pokemonState,
      randomPokemon: Object.values(pokemonIds),
    });
  }

  function getPokemonQuickInfo(pokeData) {
    return {
      name: pokeData.name,
      id: pokeData.id,
      img: pokeData.sprites.front_default,
      types: pokeData.types,
    };
  }

  //search function
  async function searchPokemon(query) {
    try {
      // Try fetching Pokémon by name
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        setPokemonState({
          ...pokemonState,
          searchResult: {
            type: "name",
            name: data.name,
            imageUrl: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
          },
        });
        return; // Exit if Pokémon name is found
      }

      // If name search fails, try fetching by egg group
      response = await fetch(
        `https://pokeapi.co/api/v2/egg-group/${query.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        setPokemonState({
          ...pokemonState,
          searchResult: {
            type: "egg-group",
            eggGroup: data.name,
            pokemon: data.pokemon_species.map((species) => species.name),
          },
        });
        return; // Exit if egg group is found
      }

      // If egg group search fails, try fetching by habitat
      response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-habitat/${query.toLowerCase()}`
      );
      if (response.ok) {
        const data = await response.json();
        setPokemonState({
          ...pokemonState,
          searchResult: {
            type: "habitat",
            habitat: data.name,
            pokemon: data.pokemon_species.map((species) => species.name),
          },
        });
      } else {
        // If all searches fail, set searchResult to null
        setPokemonState({ ...pokemonState, searchResult: null });
      }
    } catch (error) {
      console.error(error);
      setPokemonState({ ...pokemonState, searchResult: null });
    }
  }
  //save favorites function
  function addToFavorites(pokemon) {
    setPokemonState((prevState) => {
      if (prevState.favorites.some((fav) => fav.id === pokemon.id)) {
        return prevState;
      }
      return {
        ...prevState,
        favorites: [...prevState.favorites, pokemon],
      };
    });
  }

  // Function to remove a Pokémon from favorites
  function removeFromFavorites(pokemonId) {
    setPokemonState((prevState) => ({
      ...prevState,
      favorites: prevState.favorites.filter((fav) => fav.id !== pokemonId),
    }));
  }

  // Function to get favorites (for displaying on the Favorites page)
  function getFavorites() {
    return pokemonState.favorites;
  }

  const contextValue = {
    ...pokemonState,
    getNumberOfPokemon,
    getRandomPokemon,
    getPokemonQuickInfo,
    searchPokemon,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
}

export default function usePokemon() {
  return useContext(PokemonContext);
}
