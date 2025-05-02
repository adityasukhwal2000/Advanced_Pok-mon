import { useContext, useEffect, useState } from "react";
import { CompareContext } from "../contexts/CompareContext";

const WhoWillWin = () => {
  const { compareList } = useContext(CompareContext);
  const [battleResult, setBattleResult] = useState(null);

  useEffect(() => {
    if (compareList.length === 2) {
      const [p1, p2] = compareList;

      const score1 =
        p1.stats[0].base_stat +
        p1.stats[1].base_stat +
        p1.stats[2].base_stat +
        p1.stats[5].base_stat;
      const score2 =
        p2.stats[0].base_stat +
        p2.stats[1].base_stat +
        p2.stats[2].base_stat +
        p2.stats[5].base_stat;

      const result =
        score1 > score2
          ? { winner: p1.name, description: `${p1.name} is stronger!` }
          : score2 > score1
          ? { winner: p2.name, description: `${p2.name} is stronger!` }
          : { winner: "Tie", description: "Both Pokémon are equally matched!" };

      setBattleResult(result);
    }
  }, [compareList]);

  if (compareList.length !== 2) {
    return (
      <div className="compare-pok">
        Please select exactly two Pokémon to compare.
      </div>
    );
  }

  return (
    <div className="who-win">
      <h2>Who Will Win?</h2>
      <div>
        <h3>{battleResult?.winner}</h3>
        <p>{battleResult?.description}</p>
      </div>
    </div>
  );
};

export default WhoWillWin;
