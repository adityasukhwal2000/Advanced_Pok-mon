import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext"; 
import PokemonCard from "./PokemonCard";
import SearchPokemon from "./SearchPokemon";
import FilterByType from "./FilterByType";
import Pagination from "./Pagination";
import SortOptions from "./SortOptions";

const Pokemon = () => {
  const {
    loading,
    error,
    currentPokemon,
    search,
    typeFilter,
    dispatch,
    filteredCount,
  } = useContext(PokemonContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <section className="container">
      <header>
        <h1>Let&apos;s Catch Pokémon</h1>
      </header>
      <SearchPokemon
        search={search}
        setSearch={(value) => dispatch({ type: "SET_SEARCH", payload: value })}
      />
      <div className="sort-type--wrapper">
        <FilterByType
          typeFilter={typeFilter}
          setTypeFilter={(value) =>
            dispatch({ type: "SET_TYPE_FILTER", payload: value })
          }
        />
        <SortOptions />
      </div>
      <ul className="grid cards grid-four-cols">
        {filteredCount === 0 ? (
          <h2 style={{ gridColumn: "span 4" }}>No Pokémon Match.</h2>
        ) : (
          currentPokemon.map((currPokemon) => (
            <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />
          ))
        )}
      </ul>
      <Pagination /> 
    </section>
  );
};

export default Pokemon;
