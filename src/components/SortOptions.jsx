import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const SortOptions = () => {
  const { sortOption, dispatch } = useContext(PokemonContext);

  const handleChange = (e) => {
    dispatch({ type: "SET_SORT", payload: e.target.value });
  };

  return (
    <div className="sort-options">
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" value={sortOption} onChange={handleChange}>
        <option value="id">ID (Default)</option>
        <option value="name-asc">Name (A → Z)</option>
        <option value="name-desc">Name (Z → A)</option>
      </select>
    </div>
  );
};

export default SortOptions;
