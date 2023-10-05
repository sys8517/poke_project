"use client";

import { useRouter } from "next/navigation";
import styles from "./PoketCard.module.css";

export default function PoketCard({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <img src={image}></img>
        <span>{name}</span>
      </div>
    </>
  );
}
