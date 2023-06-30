import { useStore } from '@/store/rootStore'
import {
  Card,
  Center,
  Heading,
  Divider,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

//1昼夜 50min 25min 昼 25min 夜
const DAY = 50
const HALF_DAY = 25

//无法确认是否维护后会重置,可能有数秒的误差
// const dayTime = dayjs('Wed, 29 Jun 2023 11:52:10 GMT')
const DayTime: React.FC = () => {
  const store = useStore()
  const now = dayjs(store.current)
  const dayTime = getDayStart(now)
  const duration = dayjs.duration(now.diff(dayTime))
  const minutes = duration.asMinutes()
  const dayMinutes = minutes % DAY
  const isDay = dayMinutes < HALF_DAY
  const nextDayTime = dayTime.add(
    Math.ceil(minutes / HALF_DAY) * HALF_DAY,
    'minute'
  )
  const timeToNext = now.to(nextDayTime)
  const nextDayStr = nextDayTime.format('HH:mm:ss')

  return (
    <Card padding={5}>
      <Center mb={5}>
        <Heading size="md">
          现在是: {dayStr(isDay)} 距离{dayStr(!isDay)}还有:
          {timeToNext}
        </Heading>
      </Center>
      <Divider />
      <Box mt={5}>
        <Center flexDirection="column">
          <Text fontSize={20} as="b" mb={5}>
            {isDay ? '入夜' : '日出'}时间: {nextDayStr}
          </Text>
          <CircularProgress
            value={((dayMinutes % HALF_DAY) / HALF_DAY) * 100}
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

export default DayTime

function dayStr(isDay: boolean) {
  return isDay ? '白天' : '夜晚'
}

function getDayStart(now: dayjs.Dayjs) {
  const newDay = now.tz('Asia/Tokyo').startOf('h').hour(5).minute(2).second(10)
  const isnewDay = now.isAfter(newDay)
  return isnewDay ? newDay : newDay.subtract(1, 'day')
}
