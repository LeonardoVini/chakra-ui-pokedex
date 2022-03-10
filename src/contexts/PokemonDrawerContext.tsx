import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PokemonDrawerProviderProps {
  children: ReactNode
}

type PokemonDrawerContextData = UseDisclosureReturn;

const PokemonDrawerContext = createContext({} as PokemonDrawerContextData)

export function PokemonDrawerProvider({ children }: PokemonDrawerProviderProps) {
  const disclosure = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return (
    <PokemonDrawerContext.Provider value={disclosure}>
      {children}
    </PokemonDrawerContext.Provider>
  )
}

export const usePokemonDrawer = () => useContext(PokemonDrawerContext)