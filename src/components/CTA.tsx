import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={2}
  >
    <ChakraLink isExternal href="https://jikan.moe/" flexGrow={1} mx={2}>
      <Button width="100%" variant="outline" colorScheme="blue">
        Jikan API
      </Button>
    </ChakraLink>

    <ChakraLink
      isExternal
      href="https://github.com/sasigume/animegurafu"
      flexGrow={1}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="blue">
        View Repo
      </Button>
    </ChakraLink>
  </Container>
)
