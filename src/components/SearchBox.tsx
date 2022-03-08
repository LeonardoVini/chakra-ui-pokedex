import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  return (
    <Flex as="label" py="5" px="8" width="100%" maxWidth={800} bg="white" borderRadius="full" boxShadow="lg" rounded="lg">
      <Input variant="unstyled" placeholder="Search your Pokémon!" px="4" mr="4" />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
