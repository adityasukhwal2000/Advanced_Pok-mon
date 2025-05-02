import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const ALL_TYPES = [
  "Bug",
  "Electric",
  "Fire",
  "Grass",
  "Normal",
  "Rock",
  "Dark",
  "Fairy",
  "Flying",
  "Ground",
  "Poison",
  "Steel",
  "Dragon",
  "Fighting",
  "Ghost",
  "Ice",
  "Psychic",
  "Water",
];

const FilterByType = () => {
  const { typeFilter, dispatch } = useContext(PokemonContext);

  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (opt) =>
      opt.value.toLowerCase()
    );

    // Handle "All Types" selection to reset the filter
    if (selectedValues.includes("all") || selectedValues.length === 0) {
      dispatch({ type: "SET_TYPE_FILTER", payload: [] });
    } else {
      dispatch({ type: "SET_TYPE_FILTER", payload: selectedValues });
    }
  };

  return (
    <div className="filter-byType">
      <label htmlFor="sort-select">Filter By:</label>

      <select
        name="types"
        value={typeFilter.length === 0 ? "all" : typeFilter} // Show "all" when the filter is empty
        onChange={handleChange}
      >
        <option value="all">--- Filter By Types ---</option>
        {ALL_TYPES.map((type) => (
          <option key={type} value={type.toLowerCase()}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByType;
