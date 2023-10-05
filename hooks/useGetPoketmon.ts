import axios from "axios";
import { useQuery } from "react-query";

//포켓몬 리스트 조회, 무한스크롤 할 때 호출
const getPokemonList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: { limit: 19, offset: pageParam },
  });

  return data;
};

const fetchPokemonData = async (name: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return data;
};

const useGetPokemonData = (name: string) => {
  return useQuery(["useGetPokemonData", name], () => fetchPokemonData(name), {
    enabled: name !== undefined && name !== null && name !== "",
  });
};

const fetchPokemonSpeciesData = async (name: string) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );

  return data;
};

const useGetPokemonSpeciesData = (name: string) => {
  return useQuery(
    ["useGetPokemonSpeciesData", name],
    () => fetchPokemonSpeciesData(name),
    {
      enabled: name !== undefined && name !== null && name !== "",
    }
  );
};

export { getPokemonList, useGetPokemonData, useGetPokemonSpeciesData };
