import { Flex, Image, Text } from "@chakra-ui/react";
import { IPokemon } from "../../pages";

interface PokemonProps {
  pokemon: IPokemon
}

export function Pokemon({ pokemon }: PokemonProps) {
  return (
    <Flex
      as="button"
      direction="column"
      align="center"
      justify="space-evenly"
      height="36"
      bg="white"
      borderRadius="full"
      boxShadow="lg"
      rounded="lg"
      transition="all 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image boxSize="16" objectFit="contain" src={pokemon?.gif_url || pokemon?.image_url} alt={pokemon.name} />
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.name}</Text>
    </Flex>
  );
}
