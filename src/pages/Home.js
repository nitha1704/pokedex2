import React from 'react';
import styled from "styled-components";

// Component
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";
// Context
import {GlobalContext2} from '../context/context';

const Home = () => {
    const {loading} = GlobalContext2();

    return (
      <HomeSection>
        <h1>Pokedex</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="inner">
            <SearchBar />
            <PokemonCard />
          </div>
        )}
      </HomeSection>
    );
}

const HomeSection = styled.section`
  text-align: center;
  h1 {
      font-size: 5vw;
  }
`;

export default Home
