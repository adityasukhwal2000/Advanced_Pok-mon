import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ComparePage from "./pages/ComparePage";
import RandomPokemonPage from "./pages/RandomPokemonPage";

function App() {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/random" element={<RandomPokemonPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
