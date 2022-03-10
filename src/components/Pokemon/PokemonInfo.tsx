import { Flex, HStack, Image, Badge, Text, Heading, Tag, CircularProgress, CircularProgressLabel, SimpleGrid } from "@chakra-ui/react";

import { IPokemon } from "../../models/IPokemon";

interface PokemonInfoProps {
  pokemon: IPokemon;
}

export function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <Flex sx={{ position: 'sticky', top: '120', }} ml="8" direction="column" align="center" height="2xl" minWidth={350} bg="white" mt="32" borderRadius="16">
      <Image mt="-32" boxSize="64" src={pokemon.image_url} alt={pokemon.name} />
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.name}</Text>
      <HStack spacing="4">
        {pokemon.types.map(type => (
          <Badge key={type.type.name} bg={type.color}>{type.type.name}</Badge>
        )) }
      </HStack>
      <Heading as="h3" size="sm">Pokedéx Entry</Heading>
      <Text width="64">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem veniam odit at? Non consequuntur.</Text>
      <Heading as="h3" size="sm">ABILITIES</Heading>
      <SimpleGrid columns={2} spacing="4">
        {pokemon.abilities.map(item => (
          <Tag key={item.ability.name} size="md" borderRadius="full" variant="outline" bg="gray.50" fontWeight={700} width="32" pl="6" py="2">
            {item.ability.name}
          </Tag>
        )) }
      </SimpleGrid>
      <Heading as="h3" size="sm">STATS</Heading>
      <SimpleGrid columns={5} spacing="4">
        {pokemon.stats.map(item => (
          <CircularProgress key={item.stat.name} value={item.base_stat}>
            <CircularProgressLabel>{item.base_stat}</CircularProgressLabel>
          </CircularProgress>
        )) }
      </SimpleGrid>
    </Flex>
  )
}