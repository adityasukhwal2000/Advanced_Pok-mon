import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { useNavigate } from "react-router-dom";

const RandomPokemonButton = () => {
  const { currentPokemon } = useContext(PokemonContext);
  const navigate = useNavigate();

  const handleRandom = () => {
    if (!currentPokemon.length) return;
    const random =
      currentPokemon[Math.floor(Math.random() * currentPokemon.length)];
    navigate(`/pokemon/${random.id}`);
  };

  return (
    <button onClick={handleRandom} className="random-pokemon">
      Random Pokémon Generate
    </button>
  );
};

export default RandomPokemonButton;
