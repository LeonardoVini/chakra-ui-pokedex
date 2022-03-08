import { Flex, SimpleGrid, Image, Button, Text, Badge, Stack, HStack, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

import { Header } from "../components/Header";
import { PokemonList } from "../components/Pokemon/PokemonList";
import { SearchBox } from "../components/SearchBox";

import { api } from "../services/api";
import { configPokemons } from "../services/utils/configPokemons";

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

export interface IPokemon {
  id: string;
  name: string;
  url: string;
  gif_url: string;
  image_url: string;
  types: ITypes[];
}

interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  }
  color: string;
}

export default function Home({ initialPokemons, initialNextPage }: HomeProps) {
  const [pokemons, setPokemons] = useState<IPokemon[]>(initialPokemons);
  const [nextPage, setNextPage] = useState(initialNextPage);

  const loadPokemons = useCallback(async () => {
    const path = nextPage.split('/')[5]
    const { data } = await api.get<IApiResponse>(path);

    const { next, results } = data;

    const newPokemons = await configPokemons(results)

    setNextPage(next);
    setPokemons([...pokemons, ...newPokemons]);

  }, [nextPage, pokemons]);

  return (
    <>
      <Head>
        <title>Pokedex | Home</title>
      </Head>

      <Flex direction="column" padding="6">
        <Header />

        <Flex w="100%" maxW={1200} mx="auto" justify="space-between">
          <Flex direction="column" flex="1" maxWidth={800} mt="8">
            <SearchBox />
            <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} />
          </Flex>

          <Flex sx={{ position: 'sticky', top: '120', }} ml="8" direction="column" align="center" height="2xl" minWidth={350} bg="white" mt="32" borderRadius="16">
            <Image mt="-32" boxSize={64} src="https://assets.pokemon.com/assets/cms2/img/pokedex/full//188.png" alt="pokemon" />
            <Text># 395</Text>
            <Text>Empoleon</Text>
            <HStack spacing="4">
              <Badge>Ground</Badge>
              <Badge>Water</Badge>
            </HStack>
            <Heading as="h3" size="sm">Pokedéx Entry</Heading>
            <Text width="64">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem veniam odit at? Non consequuntur.</Text>
            <Heading as="h3" size="sm">ABILITIES</Heading>
            <HStack spacing="4">
              <Badge>Ground</Badge>
              <Badge>Water</Badge>
            </HStack>
          </Flex>
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
