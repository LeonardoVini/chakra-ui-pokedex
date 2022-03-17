import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

import { Header } from "../components/Header";
import { PokemonInfoDrawer } from "../components/Pokemon/PokemonInfoDrawer";
import { PokemonList } from "../components/Pokemon/PokemonList";
import { SearchBox } from "../components/SearchBox";
import { usePokemonDrawer } from "../contexts/PokemonDrawerContext";
import { IPokemon } from "../models/IPokemon";

import { api } from "../services/api";
import { configPokemons } from "../utils/configPokemons";

interface HomeProps {
  initialPokemons: IPokemon[],
  initialNextPage: string,
  count: number,
}

interface IApiResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[]
}

export default function Home({ initialPokemons, initialNextPage }: HomeProps) {
  const [pokemon, setPokemon] = useState<IPokemon>(initialPokemons[0]);
  const [pokemons, setPokemons] = useState<IPokemon[]>(initialPokemons);
  const [nextPage, setNextPage] = useState(initialNextPage);

  const { onOpen } = usePokemonDrawer()

  const isPokemonSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  const loadPokemons = useCallback(async () => {
    const path = nextPage.split('/')[5]
    const { data } = await api.get<IApiResponse>(path);

    const { next, results } = data;

    const newPokemons = await configPokemons(results)

    setNextPage(next);
    setPokemons([...pokemons, ...newPokemons]);

  }, [nextPage, pokemons]);

  const handleSelectPokemon = useCallback((pokemon: IPokemon) => {
    setPokemon(pokemon);

    isPokemonSidebar && onOpen();
  }, [isPokemonSidebar, onOpen]);

  return (
    <>
      <Head>
        <title>Pokedex | Home</title>
      </Head>

      <Flex direction="column" padding="6">
        {/* <Header /> */}

        <Flex w="100%" maxW={1200} mx="auto" justify="space-between">
          <Flex direction="column" flex="1" maxWidth={800} mt="8">
            <SearchBox />
            <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} handleSelectPokemon={handleSelectPokemon} />
          </Flex>

          <PokemonInfoDrawer pokemon={pokemon} />
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("pokemon")

  const { count, next, results } = response.data as IApiResponse

  const initialPokemons = await configPokemons(results)

  return {
    props: {
      initialPokemons,
      initialNextPage: next,
      count,
    },
  }
}
