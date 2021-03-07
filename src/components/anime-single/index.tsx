import { AnimeForGraph, AnimeForSingle } from "@/models/index"
import { Box, Divider, Flex, List, ListItem } from "@chakra-ui/layout"
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat"
import dayjs from "dayjs"
import SingleAnimeGraph from "../anime-graph/single-anime"

interface Props {
  anime: AnimeForSingle
}

const AnimeSingle = ({ anime }: Props) => {
  return (
    <Box>
      <Box as="h1" fontSize="2rem" fontWeight="bold">{anime.title_japanese} ({anime.title})</Box>
      <Divider my={6} />
      <Flex direction={{ base: "column", md: "row" }}>
        <Box mr={8}><img style={{ width: "full" }} src={anime.image_url} /></Box>
        <Box>
          <Stat my={6}>
            <StatLabel>スコア</StatLabel>
            <StatNumber>{anime.score}</StatNumber>
            <StatHelpText>

              {anime.scored_by}人が評価
    </StatHelpText>
          </Stat>
          <List>
            <ListItem>{anime.members}人が視聴</ListItem>
            <ListItem>{anime.favorites}人がお気に入りに登録</ListItem>
            <ListItem>{dayjs(anime.start_date).format('YYYY年MM月')}放送開始</ListItem>
          </List>
        </Box>
      </Flex>
      <Divider my={6} />
      <Box as="h2" fontSize="2rem">グラフ</Box>
      <SingleAnimeGraph anime={anime} />
    </Box>
  )
}

export default AnimeSingle