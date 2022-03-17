import { Flex, Stack } from "@chakra-ui/react";
import { RiDashboardLine } from 'react-icons/ri'
import { usePokemonDrawer } from "../../contexts/PokemonDrawerContext";
import { HeaderLink } from "./HeaderLink";

export function Header() {
  const { onOpen } = usePokemonDrawer()

  return (
    <Flex as="header" onClick={onOpen} w="100%" maxW={1200} mx="auto" h="24" mt="4" px="12" align="center" bg="white" boxShadow="xl" rounded="xl">
      <Stack direction="row" spacing="8" w="100%" justify="space-between">
        <HeaderLink icon={RiDashboardLine} href="#">Pokedex</HeaderLink>
        <HeaderLink icon={RiDashboardLine} href="#">Videogames</HeaderLink>
        <HeaderLink icon={RiDashboardLine} href="#">GCC Pokemon</HeaderLink>
        <HeaderLink icon={RiDashboardLine} href="#">TV Pokemon</HeaderLink>
        <HeaderLink icon={RiDashboardLine} href="#">Play! Pokemon</HeaderLink>
        <HeaderLink icon={RiDashboardLine} href="#">News</HeaderLink>
      </Stack>
    </Flex>
  );
}
