"use client";

import { useRouter } from "next/navigation";

export default function PoketCard({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <>
      <div
        style={{ border: "1px solid yellow" }}
        onClick={() => {
          router.push(`/detail/${id}`);
        }}
      >
        <img src={image}></img>
        {name}
      </div>
    </>
  );
}
