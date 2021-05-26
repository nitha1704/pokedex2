import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Search Bar Data
import searchBarData from "../data/searchBarInfo";


// Loading Image
import spinLoadingImage from "../images/loading-img/spin32x32.gif";

const PokedexContext = createContext();
const GlobalContext = ({ children }) => {
  const [state, setState] = useState({
    loading: true,
    loadingNextRow: false,
    pokemon: [],
    pokemonNextRow: [],
    pokemonSearchData: [],
    pokemonEndPoint: 12,
  });

  // Method 1
  // const fetchData = async () => {
  //   setState({ loading: true });
  //   const data = await axios
  //     .get("https://pokeapi.co/api/v2/pokemon?limit=12")
  //     .then((res) => res.data);

  //   setState({
  //     pokemon: data.results,
  //     pokemonNextRow: data.next,
  //     pokemonSearchData: searchBarData,
  //     loading: false,
  //   });
  // };

  // const fetchDataNextRow = async (scrollToNewItem) => {
  //   setState({ ...state, loadingNextRow: true });
  //   const dataNextRow = await axios
  //     .get(state.pokemonNextRow)
  //     .then((res) => res.data);

  //   state.pokemon.push(...dataNextRow.results);

  //   setState({
  //     ...state,
  //     pokemonNextRow: dataNextRow.next,
  //     loadingNextRow: false,
  //   });
  //   scrollToNewItem();
  // };

  // Method 2
  const fetchData = () => {
    setState({ loading: true });
    setState({
      pokemon: searchBarData,
      pokemonNextRow: [],
      pokemonSearchData: searchBarData,
      pokemonEndPoint: 12,
      loading: false,
    });
  };

  const fetchDataNextRow = (scrollToNewItem) => {
    setState({ ...state, loadingNextRow: true });

    setState({
      ...state,
      pokemonEndPoint: state.pokemonEndPoint + 12,
      pokemonNextRow: [],
      loadingNextRow: false,
    });
    scrollToNewItem();
  };

  const fetchFilterData = async (pokemonName) => {
    setState({ loading: true });

    const data = searchBarData.filter((item) =>
      item.name.toLowerCase().includes(pokemonName.toLowerCase())
    );
    console.log(data);

    setState({
      ...state,
      pokemon: data,
      pokemonEndPoint: 12,
      loading: false,
    });
  };

  useState(() => {
    fetchData();
  }, []);

  return (
    <PokedexContext.Provider
      value={{ ...state, fetchDataNextRow, fetchFilterData }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

const GlobalContext2 = () => {
  return useContext(PokedexContext);
};

export { GlobalContext, GlobalContext2 };
