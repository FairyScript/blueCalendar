import { IBoardDataRich } from '@/loader/boardLoader'
import {
  Box,
  Divider,
  List,
  ListItem,
  Flex,
  Text,
  Image,
  useColorMode,
  Checkbox,
} from '@chakra-ui/react'
import { useNavigate, useMatch } from 'react-router-dom'
import { useBoardData } from './Board'
import { useBoardStore } from '@/store/boardStore'
import { useStore } from '@/store/rootStore'
import TagSelect from './TagSelect'

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
      <HideCompletedCheck />
      <Divider mt={4} mb={4} />

      <Box flex={1} pr={4} overflow="auto">
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

const HideCompletedCheck: React.FC = () => {
  const state = useStore()
  const onClick = () => (state.board.hideCompleted = !state.board.hideCompleted)

  return (
    <Flex mt={4}>
      <Text mr={4}>只显示未完成任务板:</Text>
      <Checkbox isChecked={state.board.hideCompleted} onChange={onClick} />
    </Flex>
  )
}

interface IBoardItemProps {
  data: IBoardDataRich
}

const BoardItem: React.FC<IBoardItemProps> = ({ data }) => {
  const navi = useNavigate()
  const configState = useStore()
  const onClick = () => {
    navi(`/board/${data.id}`)
  }
  const match = useMatch(`/board/${data.id}`)
  const isActive = !!match

  const colorMode = useColorMode()
  const activeColor = colorMode.colorMode === 'dark' ? 'green.700' : 'green.200'

  // dont show empty board
  if (data.quest_panel.length === 0) return null

  // quest completed status
  const questCompletedCount = data.quest_panel.filter(
    q => configState.board.completed[q] === 1
  ).length
  const isCompleted = questCompletedCount === data.quest_panel.length
  const isIndeterminate = questCompletedCount > 0 && !isCompleted

  //hide completed
  if (configState.board.hideCompleted && isCompleted) return null
  return (
    <ListItem
      h={24}
      borderWidth={1}
      borderRadius={6}
      borderColor="gray.400"
      cursor="pointer"
      pr={4}
      bgColor={isActive ? activeColor : ''}
      fontWeight={isActive ? 'bold' : ''}
      onClick={onClick}
    >
      <Flex h={24} gap={4} alignItems="center">
        <Image w={32} src={getImage(data.icon_id)} draggable={false} />
        <Text>{data.name_text}</Text>
        <Box
          // stop click event
          onClick={e => {
            console.log('check', e)
            e.stopPropagation()
          }}
        >
          <Checkbox
            isChecked={isCompleted}
            isIndeterminate={isIndeterminate}
            onChange={() => {
              configState.board.toggleQuestBatch(
                data.quest_panel,
                isCompleted ? 0 : 1
              )
            }}
          />
        </Box>
      </Flex>
    </ListItem>
  )
}

function getImage(id: number) {
  return `https://bp.incin.net/_next/image?url=%2Fboard%2Fquests%2FUI_Adventureboard_${id}.webp&w=256&q=75`
}
