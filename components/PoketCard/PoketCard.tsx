"use client";

import { useRouter } from "next/navigation";
import styles from "./PoketCard.module.css";
import {
  useGetPokemonData,
  useGetPokemonSpeciesData,
} from "@/hooks/useGetPoketmon";

export default function PoketCard({ name }: { name: string }) {
  const router = useRouter();

  const pokeData = useGetPokemonData(name);
  const pokeSpecData = useGetPokemonSpeciesData(name);

  //   if (pokeData.isSuccess) {
  //     console.log("pokeData", pokeData.data);
  //   }
  //   if (pokeSpecData.isSuccess) {
  //     console.log("pokeSpecData", pokeSpecData.data);
  //   }
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
        <span>{name}</span>
      </div>
    </>
  );
}
