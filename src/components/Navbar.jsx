import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CompareContext } from "../contexts/CompareContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { compareList } = useContext(CompareContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          PokémonApp
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={location.pathname === "/favorites" ? "active" : ""}
              onClick={closeMenu}
            >
              Favorites
            </Link>
          </li>

          <li>
            <Link
              to="/random"
              className={location.pathname === "/random" ? "active" : ""}
              onClick={closeMenu}
            >
              Random
            </Link>
          </li>

          <li>
            <Link
              to="/compare"
              className={location.pathname === "/compare" ? "active" : ""}
              onClick={closeMenu}
            >
              Compare ({compareList.length})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
