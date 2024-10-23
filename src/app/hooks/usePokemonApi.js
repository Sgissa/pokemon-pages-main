import { createContex, createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export function PokemonProvider({ childern }) {
    const [pokemonState, setPokemonState] = useState({
        totalPokemonCount: 0,
    });

    async function getNumberOfPokemon() {
        const pokeRespose = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1`);
        const {count: pokemonCount } = await pokeRespose.json();
        setPokemonState({...pokemonState, totalPokemonCount: pokemonCount });

    }

    const pokemonValues = {...pokemonState, getNumberOfPokemon}



    return (
        <PokemonContext.Provider value={pokemonState}>
            {childern}
        </PokemonContext.Provider>
    );
}

export default function usePokemonApi() {
    return useContext(PokemonContext);
}