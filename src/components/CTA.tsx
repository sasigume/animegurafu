import { CONST_REPO_URL } from '@/lib/constants'
import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'

// CTA stands for Call To Action
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
      href={CONST_REPO_URL}
      flexGrow={1}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="blue">
        View Repo
      </Button>
    </ChakraLink>
  </Container>
)
