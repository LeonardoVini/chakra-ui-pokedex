import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { PokemonDrawerProvider } from '../contexts/PokemonDrawerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PokemonDrawerProvider>
        <Component {...pageProps} />
      </PokemonDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp