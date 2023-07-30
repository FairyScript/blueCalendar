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
  const list = useBoardQuery()
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

function useBoardQuery() {
  const boardStore = useBoardStore()
  const boardData = useBoardData()
  const config = useStore().board
  const conditionTypes = boardStore.conditionTypes
  const mapIds = boardStore.mapIds
  const filterCondition = conditionTypes.length > 0
  const filterMap = mapIds.length > 0
  let boardList = Object.values(boardData.boardData)

  const needFilter = filterCondition || filterMap
  if (!needFilter) return boardList

  boardList = boardList.filter(board => {
    let flag = false

    for (const questId of board.quest_panel) {
      const quest = boardData.boardQuest[questId]
      if (!quest) continue

      // pass completed quest
      if (config.queryUncompleted) {
        if (config.completed[questId] === 1) continue
      }

      // filter condition
      if (filterCondition) {
        const conditionType = parseInt(
          quest.quest_achievement_condition.condition_type
        )
        const isInCondition = conditionTypes.includes(conditionType)
        if (!isInCondition) continue
      }

      // filter map
      if (filterMap) {
        const mapId = quest.quest_achievement_condition.map_id
        const isInMap = mapId && mapIds.includes(mapId)
        if (!isInMap) continue
      }

      flag = true
    }

    return flag
  })

  // if (filterCondition || filterMap) {
  //   boardList = boardList.filter(b => {
  //     // filter condition
  //     if (filterCondition) {
  //       const isInCondition = conditionTypes.some(
  //         id => b.condition_list && b.condition_list.includes(id)
  //       )
  //       if (!isInCondition) return false
  //     }

  //     // filter map
  //     if (filterMap) {
  //       const isInMap = mapIds.some(
  //         id => b.map_id_list && b.map_id_list.includes(id)
  //       )
  //       if (!isInMap) return false
  //     }

  //     return true
  //   })
  // }

  return boardList
}

const HideCompletedCheck: React.FC = () => {
  const state = useStore()
  const toggleHideCompleted = () =>
    (state.board.hideCompleted = !state.board.hideCompleted)
  const toggleQueryFilter = () =>
    (state.board.queryUncompleted = !state.board.queryUncompleted)

  return (
    <Flex mt={4} gap={4}>
      <Flex gap={4}>
        <Text>只显示未完成任务板:</Text>
        <Checkbox
          isChecked={state.board.hideCompleted}
          onChange={toggleHideCompleted}
        />
      </Flex>
      <Flex gap={4}>
        <Text>只搜索未完成任务版:</Text>
        <Checkbox
          isChecked={state.board.queryUncompleted}
          onChange={toggleQueryFilter}
        />
      </Flex>
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
        <Box maxW={60} overflow="hidden" textOverflow="ellipsis">
          <Text whiteSpace="nowrap">{data.name_text}</Text>
        </Box>
        <Flex
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
          <Text ml={2}>
            {questCompletedCount}/{data.quest_panel.length}
          </Text>
        </Flex>
      </Flex>
    </ListItem>
  )
}

function getImage(id: number) {
  return `https://bp.incin.net/_next/image?url=%2Fboard%2Fquests%2FUI_Adventureboard_${id}.webp&w=256&q=75`
}
