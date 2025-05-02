export const initialState = {
  pokemon: [],
  loading: true,
  error: null,
  favorites: [],
  filters: {
    search: "",
    typeFilter: [],
    sortOption: "id",
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
};

export function pokemonReducer(state, action) {
  switch (action.type) {
    case "SET_POKEMON":
      return { ...state, pokemon: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "SET_SEARCH":
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case "SET_TYPE_FILTER":
      return {
        ...state,
        filters: { ...state.filters, typeFilter: action.payload },
        pagination: { ...state.pagination, currentPage: 1 },
      };
    case "SET_SORT":
      return {
        ...state,
        filters: { ...state.filters, sortOption: action.payload },
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload },
      };
    case "SET_ITEMS_PER_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          itemsPerPage: action.payload,
          currentPage: 1,
        },
      };
    default:
      return state;
  }
}
