import { Box, Checkbox, Divider, Flex, HStack, Text } from '@chakra-ui/react'
import { useBoardData } from './Board'
import { useMatch } from 'react-router-dom'
import { IBoardQuestRich } from '@/loader/boardLoader'
import { QuestConditionTag, QuestMapTag } from './ConditionTag'
import { useStore } from '@/store/rootStore'

const QuestList: React.FC = () => {
  const data = useBoardData()
  const match = useMatch(`/board/:boardId`)
  const bid = parseInt(match?.params.boardId ?? '0')
  if (!bid) return null
  const boardName = data.boardData[bid]?.name_text ?? ''
  const questIds = data.boardData[bid]?.quest_panel ?? []
  const quests = questIds.map(id => (
    <QuestItem key={id} data={data.boardQuest[id]} />
  ))

  return (
    <Flex flex={1} minW={400} h="100%" direction="column">
      <Text fontSize="2xl" fontWeight="bold">
        冒险任务-{boardName}
      </Text>
      <Divider mt={4} mb={4} />
      <Box flex={1} overflow="auto">
        <Flex direction="column" gap={10}>
          {quests}
        </Flex>
      </Box>
    </Flex>
  )
}

export default QuestList

interface IQuestItemProps {
  data: IBoardQuestRich
}

const QuestItem: React.FC<IQuestItemProps> = ({ data }) => {
  const conditionType = parseInt(
    data.quest_achievement_condition.condition_type
  )
  const mapId = data.quest_achievement_condition.map_id

  //check box
  const state = useStore()
  const isChecked = state.board.completed[data.id] === 1
  return (
    <Box opacity={isChecked ? 0.5 : 1}>
      <Flex direction="column">
        <Flex alignItems='flex-start'>
          <Checkbox
            isChecked={isChecked}
            onChange={() => state.board.toggleQuest(data.id)}
            mr={2}
            mt={1}
          />
          <Text fontWeight="bold" display="block">
            {data.quest_text}
          </Text>
        </Flex>
        <Box>
          <Text>ID: {data.id}</Text>
          <HStack>
            <QuestConditionTag type={conditionType} />
            {mapId && <QuestMapTag id={mapId} />}
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}
