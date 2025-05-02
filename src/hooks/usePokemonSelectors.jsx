import { useMemo } from "react";

export const usePokemonSelectors = (state) => {
  const filtered = useMemo(() => {
    return state.pokemon
      .filter((p) =>
        p.name.toLowerCase().includes(state.filters.search.toLowerCase().trim())
      )
      .filter((p) =>
        state.filters.typeFilter.length > 0
          ? state.filters.typeFilter.every((type) =>
              p.types.some((t) => t.type.name === type)
            )
          : true
      );
  }, [state.pokemon, state.filters.search, state.filters.typeFilter]);

  const sorted = useMemo(() => {
    const sortedList = [...filtered];
    if (state.filters.sortOption === "name-asc")
      return sortedList.sort((a, b) => a.name.localeCompare(b.name));
    if (state.filters.sortOption === "name-desc")
      return sortedList.sort((a, b) => b.name.localeCompare(a.name));
    return sortedList.sort((a, b) => a.id - b.id);
  }, [filtered, state.filters.sortOption]);

  const { currentPage, itemsPerPage } = state.pagination;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginated = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return {
    filteredCount: sorted.length,
    totalPages,
    paginated,
  };
};
