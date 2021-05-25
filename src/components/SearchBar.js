import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Lazy Loading Image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Loading Image
import spinLoadingImage from "../images/loading-img/spin32x32.gif";

// Context
import { GlobalContext2 } from "../context/context";

const SearchBar = () => {
  const { pokemonSearchData, fetchFilterData } =
    GlobalContext2();
  const [pokemonName, setPokemonName] = useState("");
  const [showSearchInformation, setShowSearchInformation] = useState(false);

  const handleCloseSearch = (event) => {
    const wrapInfo = document.querySelector(".searchbar-container");
    if (wrapInfo && !wrapInfo.contains(event.target)) {
      setShowSearchInformation(false);
    }
  };



  useEffect(() => {
    if (pokemonName.length === 0) {
      setShowSearchInformation(false);
    }
  }, [pokemonName.length]);

  useEffect(() => {
    window.addEventListener("click", handleCloseSearch);
    return () => {
      window.removeEventListener("click", handleCloseSearch);
    }
  }, []);

  return (
    <WrapSearchBar className="searchbar-container">
      <div className="wrap-searchbar">
        <input
          type="text"
          placeholder="Search for Pokemon"
          value={pokemonName}
          onChange={(event) => {
            setPokemonName(event.target.value);
            if (pokemonName.length >= 0) {
              setShowSearchInformation(true);
            }
          }}
          onClick={() =>
            pokemonName.length > 0
              ? setShowSearchInformation(true)
              : setShowSearchInformation(false)
          }
        />
        <button onClick={() => {fetchFilterData(pokemonName);setShowSearchInformation(false)}}>Search</button>
      </div>

      {showSearchInformation && (
        <div className="wrap-pokemon-search-information">
          {pokemonSearchData
            .filter((item) =>
              item.name.toLowerCase().includes(pokemonName.toLowerCase())
            )
            .map((item, index) => {
              return (
                <div
                  className="searchbar-item"
                  onClick={() => {
                    setPokemonName(item.name);
                    setShowSearchInformation(false);
                  }}
                >
                  <div className="wrap-sprites">
                    <LazyLoadImage
                      src={item.sprites}
                      alt={item.name}
                      effect="blur"
                      placeholderSrc={spinLoadingImage}
                    />
                  </div>
                  <span>
                    {item.name.charAt(0).toUpperCase() + item.name.substring(1)}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </WrapSearchBar>
  );
};

const WrapSearchBar = styled.div`
  position: relative;
  max-width: 450px;
  margin: 0 auto;
  input {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    text-transform: capitalize;
  }
  .searchbar-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2d2d2d;
    border: 1.5px solid #575757;
    border-top: none;
    padding-right: 50px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      background: #1c1b1b;
    }
  }
  .wrap-sprites {
    width: 10vw;
    height: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: auto;
    }
  }
  .wrap-searchbar {
    position: relative;
    button {
      position: absolute;
      right: 0;
      height: 100%;
      cursor: pointer;
    }
  }
  .wrap-pokemon-search-information {
    position: absolute;
    width: 100%;
    max-height: 389px;
    overflow-y: auto;
  }

  .lazy-load-image-background.blur {
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 5vw;
    height: 5vw;
    background-size: 50% 50% !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    filter: blur(0.1px);
  }
`;
export default SearchBar;
