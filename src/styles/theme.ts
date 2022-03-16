import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
  },
  styles: {
    global: (props) => ({
      body: {
        // backgroundImage: 'url(/images/pokeball.png)',
        // backgroundRepeat: 'no-repeat',
        bg: mode('gray.100', 'blue.700')(props),
        color: mode('gray.600', 'gray.600')(props),
      }
    })
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
})