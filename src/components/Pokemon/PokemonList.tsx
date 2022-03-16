import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { IPokemon } from "../../models/IPokemon";

import { PokemonItem } from "./PokemonItem";

interface PokemonListProps {
  pokemons: IPokemon[];
  loadPokemons: () => void;
  handleSelectPokemon: (pokemon: IPokemon) => void;
}

export function PokemonList({ pokemons, loadPokemons, handleSelectPokemon }: PokemonListProps) {
  return (
    <SimpleGrid columns={3} spacing="4" minChildWidth={200} mt="8">
      {pokemons?.map(pokemon => (
        <PokemonItem key={pokemon.name} pokemon={pokemon} handleSelectPokemon={handleSelectPokemon} />
      ))}
      <Flex direction="column" align="center" justify="space-evenly" height="36" bg="white" borderRadius="full" boxShadow="lg" rounded="lg">
        <Button colorScheme='teal' size='md' onClick={() => loadPokemons()}>Button</Button>
      </Flex>
    </SimpleGrid>
  )
}