import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";

import { usePokemonDrawer } from "../../contexts/PokemonDrawerContext";
import { IPokemon } from "../../models/IPokemon";
import { PokemonInfo } from "./PokemonInfo";

interface PokemonInfoDrawerProps {
  pokemon: IPokemon;
}

export function PokemonInfoDrawer({ pokemon }: PokemonInfoDrawerProps) {
  const { isOpen, onClose } = usePokemonDrawer()

  const isPokemonSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isPokemonSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.100" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Pokemon Info</DrawerHeader>

            <DrawerBody justifyItems="center">
              <PokemonInfo pokemon={pokemon} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <PokemonInfo pokemon={pokemon} />
  );
}
