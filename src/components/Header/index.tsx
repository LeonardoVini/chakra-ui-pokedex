import { Flex, Stack } from "@chakra-ui/react";
import { RiDashboardLine } from 'react-icons/ri'
import { HeaderLink } from "./HeaderLink";

export function Header() {
  return (
    <Flex as="header" w="100%" maxW={1200} mx="auto" h="24" mt="4" px="12" align="center" bg="white" boxShadow="xl" rounded="xl">
      <Stack direction="row" spacing="8" w="100%" justify="space-between">
        <HeaderLink icon={RiDashboardLine} href="#">Home</HeaderLink>
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
