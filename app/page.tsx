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
import { useInfiniteQuery } from "react-query";
import { getPokemonList } from "@/hooks/useGetPoketmon";
import { useInView } from "react-intersection-observer";

export default function Home() {
  // const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [pokemonData, setPokemonData] = useRecoilState(poketMonList);
  const [ref, isView] = useInView();
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

  const {
    data: pokemonListAll, // data.pages를 갖고 있는 배열
    error, // error 객체
    fetchNextPage: pokemonListAllFetchNextPage, //  다음 페이지를 불러오는 함수
    hasNextPage: pokemonListAllHasNextPage, // 다음 페이지가 있는지 여부, Boolean
    isFetching, // 첫 페이지 fetching 여부, Boolean
    isFetchingNextPage, // 추가 페이지 fetching 여부, Boolean
    status: pokemonListAllStatus, // loading, error, success 중 하나의 상태, string
  } = useInfiniteQuery(
    ["pokemonList"],
    ({ pageParam = 0 }) => getPokemonList({ pageParam }),
    {
      getNextPageParam: (lastPage, page) => {
        console.log("last : ", lastPage);

        const { next }: any = lastPage;
        if (!next) return undefined;
        return Number(new URL(next).searchParams.get("offset"));
      },
    }
  );

  useEffect(() => {
    console.log("isView : ", isView);
    console.log("pokemonListAllHasNextPage : ", isView);

    if (isView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage();
  }, [isView]);
  console.log("asdf asdf : ", pokemonListAll);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${pokemonData.curNum}`
  //     );
  //     // console.log("data.data : ", data.data);
  //     let list = [];
  //     if (data.data) {
  //       list = data.data.results.map((item) => {
  //         const id = item.url.split("/")[item.url.split("/").length - 2];
  //         // console.log("찾은 id : ", id);
  //         const ko_name = _.find(trans, (po) => {
  //           // console.log("po : ", po);

  //           return (
  //             parseInt(id) === parseInt(po.pokemon_species_id) &&
  //             po.local_language_id === 3
  //           );
  //         });
  //         // console.log("찾은 이름 : ", ko_name);

  //         return { id: id, name: ko_name.name, genus: ko_name.genus };
  //       });
  //     }

  //     setPokemonData((old) => {
  //       list = _.uniqBy([...list, ...old.list], "id");
  //       return { curNum: curNum, list: list };
  //     });
  //   };
  //   fetchData();
  // }, [curNum]);
  useEffect(() => {}, [curNum]);

  const renderCard = () => {
    let list = [];

    if (pokemonListAll) {
      pokemonListAll.pages.map((page) => {
        page.results.map((p) => {
          list.push(<PoketCard key={p.url} name={p.name} />);
        });
      });
      list.push(<div ref={ref}></div>);
    }
    return list;
  };

  return (
    <>
      <div className={styles.list_wrap}>
        {renderCard()}
        {/* {pokemonListAll?.pages[0].results.map((poke) => {
          return <PoketCard key={poke.id} name={poke.name} />;
        })} */}
        <div ref={ref} />
      </div>

      {/* <button
        onClick={() => {
          setCurNum(curNum + 20);
        }}
      >
        더보기
      </button> */}
    </>
  );
}
