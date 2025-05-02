import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const SearchPokemon = () => {
  const { search, dispatch } = useContext(PokemonContext);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch({ type: "SET_SEARCH", payload: localSearch });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [localSearch, dispatch]);

  return (
    <div className="pokemon-search">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchPokemon;
