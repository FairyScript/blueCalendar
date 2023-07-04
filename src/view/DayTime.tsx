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

//1昼夜 50min 25min 昼 25min 夜
const DAY = 50
const HALF_DAY = 25

const DayTime: React.FC = () => {
  const store = useStore()
  const now = dayjs(store.current)
  const dayTime = getDayStart(now)
  const minutes = dayjs.duration(now.diff(dayTime)).asMinutes()
  const isDay = minutes % DAY < HALF_DAY
  const nextDayTime = dayTime
    .add(Math.ceil(minutes / HALF_DAY) * HALF_DAY, 'minute')
    .local()
  const minutesToNext = (HALF_DAY - (minutes % HALF_DAY)).toFixed(0)
  const nextDayStr = nextDayTime.format('HH:mm:ss')
  const dayPercent = ((minutes % HALF_DAY) / HALF_DAY) * 100
  return (
    <Card padding={5}>
      <CardHeader title="时钟" notifiKey="dayTime" />
      <Divider />
      <Box mt={5}>
        <Center flexDirection="column">
          <Text>
            现在是: {dayStr(isDay)}, 距离{dayStr(!isDay)}还有:{minutesToNext}
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

function getDayStart(now: dayjs.Dayjs) {
  //无法确认是否维护后会重置,可能有数秒的误差
  const newDay = now.tz('Asia/Tokyo').startOf('h').hour(5).minute(2).second(10)
  //TODO 在东京时间5:20-9:45之间,发生了跳变.暂时无法确认具体时间点
  const isnewDay = now.isAfter(newDay)
  return isnewDay ? newDay : newDay.subtract(1, 'day')
}
