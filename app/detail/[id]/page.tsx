"use client";
export default function DetailPokeInfo({ params }: { params: { id: string } }) {
  console.log("asdf : ", params.id);

  return (
    <>
      <p>{`id : ${params.id}`}</p>
    </>
  );
}
