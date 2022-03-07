import { Flex, SimpleGrid, Button, Skeleton } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

import { Header } from "../components/Header";
import { Pokemon } from "../components/Pokemon";
import { SearchBox } from "../components/SearchBox";

import { api } from "../services/api";

interface IApiResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[]
}

interface HomeProps {
  initialPokemons: IPokemon[],
  initialNextPage: string,
  count: number,
}

export interface IPokemon {
  id: string;
  name: string;
  url: string;
  gif_url: string;
  image_url: string;
}

export default function Home({ initialPokemons, initialNextPage }: HomeProps) {
  const [pokemons, setPokemons] = useState<IPokemon[]>(initialPokemons);
  const [nextPage, setNextPage] = useState(initialNextPage);

  const loadPokemons = useCallback(async () => {
    const path = nextPage.split('/')[5]
    const { data } = await api.get<IApiResponse>(path);

    const { next, results } = data;

    const newPokemons = results.map(pokemon => {
      const id = pokemon.url.split('/')[6].padStart(3, '0')

      return {
        id: `Nº ${id}`,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        url: pokemon.url,
        gif_url: `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`,
        image_url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
      }
    })

    setNextPage(next);
    setPokemons([...pokemons, ...newPokemons]);

  }, [nextPage, pokemons]);

  // useEffect(() => {
  //   const handleScroll = async () => {
  //     setIsPageEnd(window.innerHeight + window.scrollY >= document.body.offsetHeight)

  //     if (isPageEnd) {
  //       const path = nextPage.split('/')[5]
  //       const response = await api.get(path);
  //       console.log(response);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  return (
    <>
      <Head>
        <title>Pokedex | Home</title>
      </Head>

      <Flex direction="column" padding="6">
        <Header />

        <Flex direction="column" w="100%" maxW={1200} mx="auto">
          <SearchBox />

          <SimpleGrid columns={3} spacing="4" minChildWidth={200} maxWidth={800} mt="8">
            {pokemons?.map(pokemon => (
              <Pokemon key={pokemon.name} pokemon={pokemon} />
            ))}
            <Flex direction="column" align="center" justify="space-evenly" height="36" bg="white" borderRadius="full" boxShadow="lg" rounded="lg">
              <Button colorScheme='teal' size='md' onClick={() => loadPokemons()}>Button</Button>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("pokemon")

  const { count, next, results } = response.data


  const initialPokemons = results.map(pokemon => {
    const id = pokemon.url.split('/')[6].padStart(3, '0')

    return {
      id: `Nº ${id}`,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      url: pokemon.url,
      gif_url: `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`,
      image_url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
    }
  })

  return {
    props: {
      initialPokemons,
      initialNextPage: next,
      count,
    },
  }
}
