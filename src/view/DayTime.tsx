import { useStore } from '@/store/rootStore'
import {
  Card,
  Center,
  Divider,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { memo } from 'react'
import CardHeader from './components/CardHeader'
import { getDayTime } from '@/utils/dayTime'

//1昼夜 50min 25min 昼 25min 夜
const HALF_DAY = 25

const DayTime: React.FC = () => {
  const store = useStore()
  const now = dayjs(store.current)
  const { isDay, nextDayTime, minutesToNext } = getDayTime(now)
  const nextDayStr = nextDayTime.format('HH:mm:ss')
  const dayPercent = (1 - minutesToNext / HALF_DAY) * 100
  return (
    <Card padding={5}>
      <CardHeader title="时钟" notifiKey="dayTime" />
      <Divider />
      <Box mt={5}>
        <Center flexDirection="column">
          <Text>
            现在是: {dayStr(isDay)}, 距离{dayStr(!isDay)}还有:
            {minutesToNext.toFixed(0)}
            分钟
          </Text>
          <Text fontSize={20} as="b" mb={5}>
            {isDay ? '入夜' : '日出'}时间: {nextDayStr}
          </Text>
          <CircularProgress
            value={dayPercent}
            size="120px"
            color={isDay ? 'green.400' : 'blue.400'}
          >
            <CircularProgressLabel>{isDay ? '☀' : '🌙'}</CircularProgressLabel>
          </CircularProgress>
        </Center>
      </Box>
    </Card>
  )
}

export default memo(DayTime)

function dayStr(isDay: boolean) {
  return isDay ? '白天' : '夜晚'
}
