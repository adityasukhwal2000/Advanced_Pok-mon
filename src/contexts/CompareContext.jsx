import { createContext, useState } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (pokemon) => {
    setCompareList((prev) =>
      prev.some((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : prev.length < 2
        ? [...prev, pokemon]
        : prev
    );
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider
      value={{ compareList, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
