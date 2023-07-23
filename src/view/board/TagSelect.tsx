import { useBoardStore } from '@/store/boardStore'
import { HStack, Text } from '@chakra-ui/react'
import { QuestConditionTag, QuestMapTag } from './ConditionTag'

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

export default TagSelect
