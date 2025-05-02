import { useContext, useRef, useState } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import { CompareContext } from "../contexts/CompareContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const PokemonCard = ({ pokemonData }) => {
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const { compareList, toggleCompare } = useContext(CompareContext);

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cloneStyle, setCloneStyle] = useState(null);

  const {
    id,
    name,
    height,
    weight,
    base_experience,
    sprites,
    stats,
    types,
    abilities,
  } = pokemonData;

  const speed = stats?.[5]?.base_stat || "N/A";
  const attack = stats?.[1]?.base_stat || "N/A";
  const primaryAbility = abilities?.[0]?.ability?.name || "N/A";
  const image =
    sprites?.other?.dream_world?.front_default || sprites?.front_default || "";

  const isFavorite = favorites.includes(id);
  const isInCompareList = compareList.some((p) => p.id === id);

  const handleViewDetails = () => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const translateX = centerX - (rect.left + rect.width / 2);
    const translateY = centerY - (rect.top + rect.height / 2);

    setCloneStyle({
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      transform: `translate(${translateX}px, ${translateY}px) rotate(0deg)`,
      zIndex: 9999,
      transition: "transform 0.8s ease-in-out",
    });

    setIsAnimating(true);

    requestAnimationFrame(() => {
      setCloneStyle((prev) => ({
        ...prev,
        transform: `translate(${translateX}px, ${translateY}px) rotateY(720deg) scale(1.2)`,
      }));
    });

    setTimeout(() => {
      navigate(`/pokemon/${id}`);
    }, 800);
  };

  return (
    <>
      <li
        ref={cardRef}
        className={`pokemon-card ${isFavorite ? "favorite" : ""}`}
      >
        <figure>
          <img
            src={image}
            alt={name}
            className="pokemon-image"
            loading="lazy"
          />
        </figure>

        <h2 className="pokemon-name">{name}</h2>

        <div className="pokemon-types pokemon-highlight">
          <p>{types.map((t) => t.type.name).join(", ")}</p>
        </div>

        <div className="grid grid-three-cols all-info-div">
          <div className="pokemon-info">
            <span>Height:</span> <p>{height}</p>
          </div>
          <div className="pokemon-info">
            <span>Weight:</span> <p>{weight}</p>
          </div>
          <div className="pokemon-info">
            <span>Speed:</span> <p>{speed}</p>
          </div>
        </div>

        <div className="grid grid-three-cols all-info-div">
          <div className="pokemon-info">
            <span>XP:</span> <p>{base_experience}</p>
          </div>
          <div className="pokemon-info">
            <span>Attack:</span> <p>{attack}</p>
          </div>
          <div className="pokemon-info">
            <span>Ability:</span> <p>{primaryAbility}</p>
          </div>
        </div>

        <div className="card-actions">
          <button
            className={`favorite-btn-icon ${isFavorite ? "favorited" : ""}`}
            onClick={() => toggleFavorite(id)}
            aria-label="Toggle Favorite"
          >
            {isFavorite ? (
              <MdOutlineFavorite className="heart" />
            ) : (
              <MdOutlineFavoriteBorder className="heart" />
            )}
          </button>

          <div className="btn-wrapper">
            <button
              onClick={() => toggleCompare(pokemonData)}
              disabled={!isInCompareList && compareList.length >= 2}
              className="compare-btn"
            >
              {isInCompareList ? "Remove from Compare" : "Compare"}
            </button>

            <button onClick={handleViewDetails} className="details-link">
              View Details
            </button>
          </div>
        </div>
      </li>

      {isAnimating && (
        <>
          <div className="background-overlay"></div>

          <div style={cloneStyle} className="pokemon-card card-clone">
            <figure>
              <img
                src={image}
                alt={name}
                className="pokemon-image"
                loading="lazy"
              />
            </figure>
            <h2 className="pokemon-name">{name}</h2>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonCard;
