import { ElementType } from "react";
import { Icon, Text, Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import Link from "next/link";

interface HeaderLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function HeaderLink({ icon, children, href, ...rest }: HeaderLinkProps) {
  return (
    <Link href={href} passHref >
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </Link>
  );
}
