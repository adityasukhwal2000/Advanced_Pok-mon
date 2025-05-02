import { useContext } from "react";
import { CompareContext } from "../contexts/CompareContext";

const CompareView = () => {
  const { compareList, clearCompare } = useContext(CompareContext);

  if (compareList.length < 2) return null;

  return (
    <div className="compare-container">
      <h2 className="compare-h2">Compare Pokémon</h2>
      <div className="compare-grid">
        {compareList.map((p) => (
          <div key={p.id}>
            <h3>{p.name}</h3>
            <p>HP: {p.stats[0].base_stat}</p>
            <p>Attack: {p.stats[1].base_stat}</p>
            <p>Defense: {p.stats[2].base_stat}</p>
            <p>Speed: {p.stats[5].base_stat}</p>
          </div>
        ))}
      </div>
      <button onClick={clearCompare} className="clear-compare">
        Clear Comparison
      </button>
    </div>
  );
};

export default CompareView;
