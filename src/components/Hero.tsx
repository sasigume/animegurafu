import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" alignItems="center" py={16}>
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'animegurafu',
}
