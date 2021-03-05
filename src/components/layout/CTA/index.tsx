import { CONST_REPO_URL } from '@/lib/constants'
import { Link as ChakraLink, Button, Flex, Center, Container } from '@chakra-ui/react'

// CTA stands for Call To Action
export const CTA = () => (
  <Flex
    justifyContent="center"
    position="fixed"
    bottom="0"
    width="full"
    py={2}
  >
    <Container maxW="container.xl">
      <Flex>
        <ChakraLink isExternal href="https://jikan.moe/" flexGrow={1} mx={2}>
          <Button width="100%" colorScheme="green">
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
      </Flex>
    </Container>
  </Flex>
)
