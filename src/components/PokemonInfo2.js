import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import pokemonData from "../data/pokemonData";

const PokemonInfo = () => {
  
  const { id: pokemonID } = useParams();

  const [loading2, setLoading2] = useState(false);
  const [info1, setInfo1] = useState({
    id: "id",
    name: "name",
    abilities: [],
    height: "height",
    weight: "weight",
    stats: "stats",
    types: [],
    EVs: [],
  });
  const [info2, setInfo2] = useState({
    capture_rate: "capture_rate",
    egg_groups: [],
    description: "flavor_text_entries",
    hatch_counter: "hatch_counter",
    gender_rate: {
      originalRate: "gender_rate",
      femaleRate: "female rate",
      maleRate: "male rate",
    },
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

    // const pokemonIndexNumber = [];
    // for (var i = 1; i <= 898; i++) {
    //   pokemonIndexNumber.push(i);
    // }
    // const allInfo = pokemonIndexNumber.map(async (item, index) => {
    //   return Promise.all([
    //     await axios.get(`https://pokeapi.co/api/v2/pokemon/${item}/`),
    //     await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item}/`),
    //   ])
    //     .then((res) => res)
    //     .then((res2) =>
    //       res2.map((item) => {
    //         return item.data;
    //       })
    //     );
    // });
    // const allInfo2 = await Promise.all(allInfo).then((res) => res);
    // const allInfo3 = allInfo2.map((item) => {
    //   return { ...item[0], ...item[1] };
    // });
    // const allInfo4 = allInfo3.map(
    //   ({ id, name, abilities, height, weight, stats, types,
    //       capture_rate,
    //   egg_groups,
    //   flavor_text_entries,
    //   hatch_counter,
    //   gender_rate, }) => {
    //     return {
    //       id,
    //       name,
    //       abilities,
    //       height,
    //       weight,
    //       stats,
    //       types,
    //       capture_rate,
    //       egg_groups,
    //       flavor_text_entries: flavor_text_entries.filter((item) => {
    //           if(item.language.name === "en") {
    //               return item
    //           }          
    //       }).map((item, index, array)=>{
    //           if (index === array.length - 1) {
    //             return item.flavor_text;
    //           }     
    //       }).filter(item => {
    //           if(item !== undefined) {
    //               return item
    //           }
    //       }),
    //       hatch_counter,
    //       gender_rate,
    //     };
    //   }
    // );
    // console.log(allInfo4);


    let { id, name, abilities, height, weight, stats, types } =
      pokemonData[pokemonID - 1];
    let {
      capture_rate,
      egg_groups,
      flavor_text_entries,
      hatch_counter,
      gender_rate,
    } = pokemonData[pokemonID - 1];

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
      types: types,
      EVs: stats.filter((item) => {
        if (item.effort > 0) {
          return item;
        }
      }),
    });
    setInfo2({
      capture_rate: Math.round((100 / 255) * capture_rate),
      egg_groups: egg_groups,
      description: flavor_text_entries[0],
      hatch_counter: (hatch_counter + 1) * 255,
      gender_rate: {
        originalRate: gender_rate,
        femaleRate: gender_rate * 12.5,
        maleRate: (8 - gender_rate) * 12.5,
      },
    });

    setLoading2(false);
  };

  useEffect(() => {
    fetchInfoData();
  }, [pokemonID]);

  return (
    <PokemonInformation className="pokemon-information">
      <h1>PokemonInfo2</h1>
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
              <p>hatch steps: {info2.hatch_counter}</p>
              <div>
                <h4>Abilities</h4>
                {info1.abilities.map((item) => {
                  return (
                    <span className="ability-name">
                      {item.ability.name.charAt(0).toUpperCase() +
                        item.ability.name.slice(1)}
                    </span>
                  );
                })}
              </div>
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
            <div className="information-section3">
              <div className="wrap-types">
                <h3>types:</h3>
                {info1.types.map((item) => {
                  return (
                    <span className="type">
                      {item.type.name.charAt(0).toUpperCase() +
                        item.type.name.slice(1)}
                    </span>
                  );
                })}
              </div>
              <div className="wrap-egg-groups">
                <h3>egg groups</h3>
                {info2.egg_groups.map((item) => {
                  return (
                    <span className="egg-groups">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </span>
                  );
                })}
              </div>
              <div className="wrap-gender-rate">
                <p>male: {info2.gender_rate.maleRate}%</p>
                <p>female: {info2.gender_rate.femaleRate}%</p>
              </div>
              <div className="wrap-evs">
                <h3>EVs</h3>
                {info1.EVs.length > 0 && (
                  <>
                    <span className="evs-effort">{info1.EVs[0].effort}</span>
                    <span className="stat-name">{info1.EVs[0].stat.name}</span>
                  </>
                )}
              </div>
            </div>
            <div className="information-section4">
              <h3>Description</h3>
              <p>
                {info2.description[info2.description.length - 1].flavor_text}
              </p>
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 50px;
  }
  .ability-name,
  .egg-groups {
    position: relative;
    margin-right: 8px;
    &:after {
      position: absolute;
      content: ",";
    }
  }
  .ability-name:last-child,
  .egg-groups:last-child {
    &:after {
      content: none;
    }
  }
  .wrap-types {
    .type {
      margin-right: 10px;
    }
  }
  .wrap-evs {
    span {
      margin-right: 5px;
    }
    .stat-name {
      text-transform: capitalize;
    }
  }
`;

export default PokemonInfo;