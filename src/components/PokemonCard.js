import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
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

  const scrollToNewItem = () => {
    let pokemonCardElem = document.querySelector(
      ".pokemon-card-container"
    ).children;
    let elem = pokemonCardElem[pokemonCardElem.length - 12];
    let elemTop = elem.offsetTop;
    let elemBottom = elemTop + elem.offsetHeight;

    setTimeout(() => {
      window.scroll({
        top: elemTop + 100,
        left: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  return (
    <WrapPokemonCard className="wrap-pokemon-card">
      <div className="pokemon-card-container">
        {pokemon.slice(0, pokemonEndPoint).map((item, index) => {
          const pokemonThumbnail =
            index + 1 < 10
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${
                  index + 1
                }.png`
              : index + 1 < 100
              ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${
                  index + 1
                }.png`
              : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
                  index + 1
                }.png`;
          return (
            <div className="pokemon-card">
              <LazyLoadImage
                src={pokemonThumbnail}
                alt={item.name}
                className="pokemon-thumbnail"
                placeholderSrc={loadingIMG}
              />
              <h3>
                No.{index + 1}{" "}
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </h3>
            </div>
          );
        })}
      </div>
      <div className="wrap-loading-more-btn">
        {loadingNextRow ? (
          <img src={spinLoadingImage} />
        ) : pokemonNextRow ? (
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
