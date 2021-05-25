import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const PokemonInfo = () => {
  const { id: pokemonID } = useParams();

  const [loading2, setLoading2] = useState(false);
  const [info1, setInfo1] = useState({
    id: "id",
    name: "name",
    abilities: "abilities",
    height: "height",
    weight: "weight",
    stats: "stats",
  });
  const [info2, setInfo2] = useState({
    capture_rate: "capture_rate",
    egg_groups: "egg_groups",
    flavor_text_entries: "flavor_text_entries",
    hatch_counter: "hatch_counter",
    gender_rate: "gender_rate",
  });

  const url1 = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
  const url2 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;

  const pokemonImage2 =
    pokemonID < 10
      ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${info1.id}.png`
      : pokemonID < 100
      ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${info1.id}.png`
      : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${info1.id}.png`;

  const fetchInfoData = async () => {
    setLoading2(true);
    const allInfo = await Promise.all([axios.get(url1), axios.get(url2)]).then(
      (res) => res
    );
    let { id, name, abilities, height, weight, stats } = allInfo[0].data;
    let {
      capture_rate,
      egg_groups,
      flavor_text_entries,
      hatch_counter,
      gender_rate,
    } = allInfo[1].data;

    // Status
    const status = stats.reduce((acc, item) => {
      if (!acc[item.stat.name]) {
        acc[item.stat.name] = item.base_stat;
      }
      return acc;
    }, {});

    setInfo1({
      id: id,
      name: name,
      abilities: abilities,
      height: height,
      weight: weight,
      stats: status,
    });
    setInfo2({
      capture_rate: capture_rate,
      egg_groups: egg_groups,
      flavor_text_entries: flavor_text_entries,
      hatch_counter: hatch_counter,
      gender_rate: gender_rate,
    });

    setLoading2(false);
  };

  useEffect(() => {
    fetchInfoData();
  }, [pokemonID]);

  console.log(info1);

  return (
    <PokemonInformation className="pokemon-information">
      <h1>PokemonInfo</h1>
      {loading2 ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="inner">
          <div className="navigator-bar">
            {parseInt(pokemonID) > 1 && (
              <Link to={`/pokemon/${parseInt(pokemonID) - 1}`}>Back</Link>
            )}
            {parseInt(pokemonID) !== 898 && (
              <Link to={`/pokemon/${parseInt(pokemonID) + 1}`}>Next</Link>
            )}
          </div>
          <img src={pokemonImage2} className="pokemon-image" />
          <div className="wrap-information">
            <div className="information-section1">
              <h2>No. {info1.id}</h2>
              <h1>Name: {info1.name}</h1>
              <p>height: {info1.height}</p>
              <p>weight: {info1.weight}</p>
              <p>capture rate: {info2.capture_rate}</p>
            </div>
            <div className="information-section2">
              <h1>Status</h1>
              <p>hp: {info1.stats.hp}</p>
              <p>attack: {info1.stats.attack}</p>
              <p>defense: {info1.stats.defense}</p>
              <p>special-attack: {info1.stats["special-attack"]}</p>
              <p>special-defense: {info1.stats["special-defense"]}</p>
              <p>speed: {info1.stats.speed}</p>
            </div>
          </div>
        </div>
      )}
    </PokemonInformation>
  );
};

const PokemonInformation = styled.div`
  text-align: center;
  a {
    background: red;
    padding: 20px;
    margin: 20px;
  }
  .pokemon-image {
    width: 25vw;
    height: 25vw;
  }
  .wrap-information {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export default PokemonInfo;
