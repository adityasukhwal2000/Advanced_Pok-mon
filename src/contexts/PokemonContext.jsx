import { createContext, useReducer, useEffect, useState } from "react";
import { pokemonReducer, initialState } from "../reducers/pokemonReducer";
import { useFetchPokemon } from "../hooks/useFetchPokemon";
import { usePokemonSelectors } from "../hooks/usePokemonSelectors";

// Initialize favorites from localStorage, default to empty array if none found
const loadFavoritesFromStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const [favorites, setFavorites] = useState(loadFavoritesFromStorage());

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch Pokemon and handle selectors
  useFetchPokemon(dispatch);
  const { filteredCount, totalPages, paginated } = usePokemonSelectors(state);

  const toggleFavorite = (pokemonId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(pokemonId)
        ? prevFavorites.filter((id) => id !== pokemonId)
        : [...prevFavorites, pokemonId];
      return updatedFavorites;
    });
  };

  return (
    <PokemonContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        search: state.filters.search,
        typeFilter: state.filters.typeFilter,
        sortOption: state.filters.sortOption,
        currentPage: state.pagination.currentPage,
        itemsPerPage: state.pagination.itemsPerPage,
        totalPages,
        filteredCount,
        currentPokemon: paginated,
        favorites,
        toggleFavorite,
        dispatch,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
