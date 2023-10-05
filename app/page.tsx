"use client";
import Image from "next/image";
import styles from "./page.module.css";
import PoketCard from "@/components/PoketCard/PoketCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { poketMonList } from "@/recoil/PokeList";
import trans from "@/static/lang_list.json";
import _ from "lodash";
import "../static/fonts/font.css";

export default function Home() {
  // const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [pokemonData, setPokemonData] = useRecoilState(poketMonList);
  const [curNum, setCurNum] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const allPokemonData = [];
  //     // for (let i = 1; i <= 151; i++) {
  //     for (let i = 1; i <= 200; i++) {
  //       const response = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/${i}`
  //       );
  //       const speciesResponse = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon-species/${i}`
  //       );
  //       const koreanName = speciesResponse.data.names.find(
  //         (name) => name.language.name === "ko"
  //       );

  //       // console.log("response.data : ", response.data);
  //       // console.log("speciesResponse.data : ", speciesResponse.data);

  //       allPokemonData.push({ ...response.data, korean_name: koreanName.name });
  //     }
  //     setPokemonData({ list: allPokemonData, curNum: 1 });
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pokemonData.curNum}`
      );
      console.log("data.data : ", data.data);
      let list = [];
      if (data.data) {
        list = data.data.results.map((item) => {
          const id = item.url.split("/")[item.url.split("/").length - 2];
          console.log("찾은 id : ", id);
          const ko_name = _.find(trans, (po) => {
            console.log("po : ", po);

            return (
              parseInt(id) === parseInt(po.pokemon_species_id) &&
              po.local_language_id === 3
            );
          });
          console.log("찾은 이름 : ", ko_name);

          return { id: id, name: ko_name.name, genus: ko_name.genus };
        });
      }

      setPokemonData((old) => {
        list = _.uniqBy([...list, ...old.list], "id");
        return { curNum: curNum, list: list };
      });
    };
    fetchData();
  }, [curNum]);
  useEffect(() => {}, [curNum]);
  useEffect(() => {
    console.log("asdf : ", pokemonData);
  }, [pokemonData]);
  return (
    <>
      <div className={styles.list_wrap}>
        {pokemonData.list.map((poke) => {
          return <PoketCard key={poke.id} id={poke.id} name={poke.name} />;
        })}
      </div>
      <button
        onClick={() => {
          setCurNum(curNum + 20);
        }}
      >
        더보기
      </button>
    </>
  );
}
