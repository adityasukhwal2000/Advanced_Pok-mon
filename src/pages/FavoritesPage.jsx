import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";

const FavoritesPage = () => {
  const { favorites, currentPokemon } = useContext(PokemonContext);

  const favoritePokemon = currentPokemon.filter(
    (pokemon) => favorites && favorites.includes(pokemon.id)
  );

  return (
    <section className="favorites-page container">
      <header>
        <h1>Your Favorite Pokémon</h1>
      </header>

      <ul className="grid cards grid-four-cols">
        {favoritePokemon.length === 0 ? (
          <h2 style={{ gridColumn: "span 4" }}>You have no favorites yet.</h2>
        ) : (
          favoritePokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonData={pokemon} />
          ))
        )}
      </ul>
    </section>
  );
};

export default FavoritesPage;
