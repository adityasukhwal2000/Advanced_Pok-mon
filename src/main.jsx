import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PokemonProvider } from "./contexts/PokemonContext.jsx";
import ErrorBoundary from "./contexts/ErrorBoundary.jsx";
import { CompareProvider } from "./contexts/CompareContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <PokemonProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </PokemonProvider>
    </ErrorBoundary>
  </StrictMode>
);
