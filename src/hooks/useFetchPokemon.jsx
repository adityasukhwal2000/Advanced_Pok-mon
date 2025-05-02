import { useEffect } from "react";

const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150";

export const useFetchPokemon = (dispatch) => {
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        const details = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        );
        dispatch({ type: "SET_POKEMON", payload: details });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err });
      }
    };
    fetchPokemon();
  }, [dispatch]);
};
