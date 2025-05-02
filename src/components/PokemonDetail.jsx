import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/PokemonDetail.css";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch main Pokémon data
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        // Fetch species data (for description and evolution chain)
        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        // Get English description
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setDescription(
          englishEntry
            ? englishEntry.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ")
            : "No description available."
        );

        // Fetch and parse evolution chain
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const chainData = [];
        let current = evoData.chain;

        while (current) {
          const name = current.species.name;

          // Fetch Pokémon data to get sprite
          const pokeRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const pokeData = await pokeRes.json();

          chainData.push({
            name,
            sprite:
              pokeData.sprites.other["official-artwork"].front_default ||
              pokeData.sprites.front_default,
          });

          current = current.evolves_to[0];
        }

        setEvolutionChain(chainData);
      } catch (err) {
        setError(err);
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <h1>Error: {error.message}</h1>;
  if (!pokemon) return <h1>Loading...</h1>;

  // Prepare data for the stats chart
  const statLabels = pokemon.stats.map((stat) => stat.stat.name);
  const statValues = pokemon.stats.map((stat) => stat.base_stat);

  const chartData = {
    labels: statLabels,
    datasets: [
      {
        label: "Base Stats",
        data: statValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <section className="pokemon-detail container">
      <Link to="/" className="back-link">
        ← Back to list
      </Link>
      <h1 className="detail-name">{pokemon.name}</h1>

      <div className="detail1">
        <div className="detail-header">
          <img
            src={
              pokemon.sprites.other.dream_world.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="detail-image"
          />
        </div>

        <div className="detail-section">
          <p>{description}</p>

          <div className="abilities-section">
            <h2>Abilities</h2>
            <ul>
              {pokemon.abilities.map((a) => (
                <button key={a.ability.name}>{a.ability.name}</button>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2>Stats</h2>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="detail-section">
        <h2>Moves</h2>
        <ul className="scrollable-list">
          {pokemon.moves.map((move) => (
            <li key={move.move.name}>{move.move.name}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h2>Evolution Chain</h2>
        <div className="evolution-chain">
          {evolutionChain.map((poke, index) => (
            <div key={poke.name} className="evolution-item">
              <div className="evolution-pic">
                <img
                  src={poke.sprite}
                  alt={poke.name}
                  className="evolution-sprite"
                />
                {index < evolutionChain.length - 1 && (
                  <span className="arrow">❯</span>
                )}
              </div>
              <p>{poke.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
