"use client";

import { useRouter } from "next/navigation";
import styles from "./PoketCard.module.css";
import {
  useGetPokemonData,
  useGetPokemonSpeciesData,
} from "@/hooks/useGetPoketmon";

export default function PoketCard({ name }: { name: string }) {
  const router = useRouter();
  let ko_name = "";

  //포켓몬의 데이터 불러오기
  const pokeData = useGetPokemonData(name);
  //포켓몬 종족 정보 불러오기
  const pokeSpecData = useGetPokemonSpeciesData(name);
  if (pokeSpecData.isSuccess) {
    ko_name = pokeSpecData.data.names.find((name) => {
      return name.language.name === "ko";
    }).name;
    console.log("koname : ", ko_name);
  }
  //   if (pokeData.isSuccess) {
  //     console.log("pokeData", pokeData.data);
  //   }
  if (pokeSpecData.isSuccess) {
    console.log("pokeSpecData", pokeSpecData.data);
  }
  //   const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          router.push(`/detail/${name}`);
        }}
      >
        <img
          src={
            (pokeData.isSuccess &&
              pokeData.data.sprites?.versions?.["generation-v"]?.["black-white"]
                ?.animated?.front_default) ||
            pokeData.data?.sprites?.front_default
          }
        ></img>
        <span>{ko_name}</span>
      </div>
    </>
  );
}
