import {
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react'
import type { TagProps } from '@chakra-ui/react'
import { useBoardData } from './Board'
import { useBoardStore } from '@/store/boardStore'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const QUEST_CONDITION_TYPE: Record<number, string> = {
  5: '入手',
  6: '装備',
  19: 'クエスト',
  20: '討伐',
  22: '調査',
  26: 'ミッション',
  34: '採取',
}

const QUEST_CONDITION_TYPE_COLOR: Record<number, string> = {
  5: 'red',
  6: 'purple',
  19: 'yellow',
  20: 'red',
  22: 'blue',
  26: 'blue',
  34: 'green',
}

interface IQuestConditionTagProps extends TagProps {
  type: number
  closeTag?: boolean
}

export const QuestConditionTag: React.FC<IQuestConditionTagProps> = ({
  type,
  closeTag,
  ...props
}) => {
  const str = QUEST_CONDITION_TYPE[type] ?? '未知'
  const color = QUEST_CONDITION_TYPE_COLOR[type]
  const state = useBoardStore()
  const onClick = () => {
    const action = closeTag ? 'remove' : 'add'
    state.setTag('conditionTypes', type, action)
  }
  return (
    <Tag
      colorScheme={color}
      borderRadius="full"
      cursor="pointer"
      onClick={closeTag ? undefined : onClick}
      {...props}
    >
      <TagLabel>{str}</TagLabel>
      {closeTag && <TagCloseButton onClick={onClick} />}
    </Tag>
  )
}

interface IQuestMapProps extends TagProps {
  id: string
  closeTag?: boolean
}

export const QuestMapTag: React.FC<IQuestMapProps> = ({
  id,
  closeTag,
  ...props
}) => {
  const boardData = useBoardData()
  const state = useBoardStore()
  const onClick = () => {
    const action = closeTag ? 'remove' : 'add'
    state.setTag('mapIds', id, action)
  }
  const [menu, setMenu] = useState(false)
  return (
    <Popover isLazy isOpen={menu} onClose={() => setMenu(false)}>
      <PopoverTrigger>
        <Tag
          colorScheme="linkedin"
          cursor="pointer"
          borderRadius="full"
          onClick={closeTag ? undefined : onClick}
          onContextMenu={e => {
            e.preventDefault()
            setMenu(true)
          }}
          {...props}
        >
          <TagLabel> {boardData.locationName[id]}</TagLabel>
          {closeTag && <TagCloseButton onClick={onClick} />}
        </Tag>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Link
            as={RouterLink}
            to={`https://bp-map.bluefissure.com/${id.split('_')[0]}`}
            target="_blank"
          >
            打开互动地图
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
