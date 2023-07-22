import { IBoardDataRich } from '@/loader/boardLoader'
import {
  Box,
  Divider,
  List,
  ListItem,
  Flex,
  Text,
  Image,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
  useColorMode,
} from '@chakra-ui/react'
import { useNavigate, useMatch } from 'react-router-dom'
import { useBoardData } from './Board'
import { useBoardStore } from '@/store/boardStore'
import { QuestConditionTag, QuestMapTag } from './ConditionTag'

const BoardList: React.FC = () => {
  const data = useBoardData()
  const state = useBoardStore()
  const conditionTypes = state.conditionTypes
  const mapIds = state.mapIds
  const filterCondition = conditionTypes.length > 0
  const filterMap = mapIds.length > 0
  let list = Object.values(data.boardData)
  if (filterCondition || filterMap) {
    list = list.filter(b => {
      const isInCondition =
        !filterCondition ||
        conditionTypes.some(
          id => b.condition_list && b.condition_list.includes(id)
        )

      const isInMap =
        !filterMap ||
        mapIds.some(id => b.map_id_list && b.map_id_list.includes(id))

      return isInCondition && isInMap
    })
  }
  return (
    <Flex minW={400} h="100%" direction="column">
      <Text fontSize="2xl" fontWeight="bold">
        冒险板
      </Text>
      <Divider mt={4} mb={4} />
      <TagSelect />
      <Divider mt={4} mb={4} />

      <Box flex={1} overflow="auto">
        <List spacing={4}>
          {list.map(b => (
            <BoardItem key={b.id} data={b} />
          ))}
        </List>
      </Box>
    </Flex>
  )
}

export default BoardList

const TagSelect: React.FC = () => {
  const state = useBoardStore()

  const cItems = state.conditionTypes.map(id => (
    <QuestConditionTag key={id} type={id} closeTag />
  ))
  const mTags = state.mapIds.map(id => (
    <QuestMapTag key={id} id={id} closeTag />
  ))
  return (
    <HStack
      h={12}
      borderColor="gray.400"
      borderRadius={6}
      borderWidth={1}
      padding="0 16px"
    >
      <Text mr={4}>筛选条件:</Text>
      {cItems}
      {mTags}
    </HStack>
  )
}

interface IBoardItemProps {
  data: IBoardDataRich
}

const BoardItem: React.FC<IBoardItemProps> = ({ data }) => {
  const navi = useNavigate()
  const onClick = () => {
    navi(`/board/${data.id}`)
  }
  const match = useMatch(`/board/${data.id}`)
  const isActive = !!match

  const colorMode = useColorMode()
  const activeColor = colorMode.colorMode === 'dark' ? 'green.700' : 'green.200'

  // dont show empty board
  if (data.quest_panel.length === 0) return null

  return (
    <ListItem
      h={24}
      borderWidth={1}
      borderRadius={6}
      borderColor="gray.400"
      cursor="pointer"
      bgColor={isActive ? activeColor : ''}
      fontWeight={isActive ? 'bold' : ''}
      onClick={onClick}
    >
      <Flex h={24} gap={10} alignItems="center">
        <Image w={32} src={getImage(data.icon_id)} draggable={false} />
        <Text>{data.name_text}</Text>
      </Flex>
    </ListItem>
  )
}

function getImage(id: number) {
  return `https://bp.incin.net/_next/image?url=%2Fboard%2Fquests%2FUI_Adventureboard_${id}.webp&w=256&q=75`
}
