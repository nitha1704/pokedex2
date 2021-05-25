import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { animateScroll } from "react-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Context
import { GlobalContext2 } from "../context/context";

// Loading Image
import spinLoadingImage from "../images/loading-img/Spin-1s-200px.gif";
import loadingIMG from "../images/loading-img/loading2-small.gif";

const PokemonCard = () => {
  const {
    pokemon,
    pokemonNextRow,
    pokemonEndPoint,
    loadingNextRow,
    fetchDataNextRow,
  } = GlobalContext2();

  const [pokemonCardLength, setPokemonCardLength] = useState(0);

  const scrollToNewItem = () => {
    let pokemonCardElem = document.querySelector(
      ".pokemon-card-container"
    ).children;
    let elem = pokemonCardElem[pokemonCardElem.length - 1];
    let elemTop = elem.offsetTop;
    let elemBottom = elemTop + elem.offsetHeight;

    // setTimeout(() => {
    //   window.scroll({
    //     top: elemBottom + 100,
    //     left: 0,
    //     behavior: "smooth",
    //   });
    // }, 300);
    animateScroll.scrollTo(elemBottom + 100, {
      duration: 700,
      delay: 300,
    });
  };

  useEffect(() => {
    let pokemonCardElem = document.querySelector(
      ".pokemon-card-container"
    ).children;
    setPokemonCardLength(pokemonCardElem.length);
  });

  return (
    <WrapPokemonCard className="wrap-pokemon-card">
      <div className="pokemon-card-container">
        {pokemon.slice(0, pokemonEndPoint).map((item, index) => {
          const { id, name } = item;
          const pokemonImage =
            id < 10
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`
              : id < 100
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png`
              : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;

          return (
            <div className="pokemon-card">
              <Link to={`pokemon/${id}`}>
                <LazyLoadImage
                  src={pokemonImage}
                  alt={name}
                  className="pokemon-thumbnail"
                  placeholderSrc={loadingIMG}
                />
                <h3>
                  No.{id} {name.charAt(0).toUpperCase() + name.slice(1)}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="wrap-loading-more-btn">
        {loadingNextRow ? (
          <img src={spinLoadingImage} />
        ) : pokemon.length > pokemonCardLength ? (
          <button
            className="loading-more"
            onClick={() => fetchDataNextRow(scrollToNewItem)}
          >
            Loading More
          </button>
        ) : (
          <button className="no-more-item" disabled>
            No more Item
          </button>
        )}
      </div>
    </WrapPokemonCard>
  );
};

const WrapPokemonCard = styled.div`
  .pokemon-card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .pokemon-thumbnail {
      width: 15vw;
      height: 15vw;
    }
    .pokemon-card {
      font-size: 2vw;
    }
  }

  .wrap-loading-more-btn {
    margin: 50px 0;
    img {
      height: 50px;
    }
    button {
      padding: 10px;
      font-size: 1.5vw;
    }
    button.loading-more {
      cursor: pointer;
    }
    button.no-more-item {
      cursor: not-allowed;
      color: #fff;
    }
  }
`;
export default PokemonCard;
