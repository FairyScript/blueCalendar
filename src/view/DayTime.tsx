import {
  Card,
  Center,
  Heading,
  Divider,
  Box,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'
import dayjs from 'dayjs'

//1昼夜 50min 25min 昼 25min 夜
const DAY = 50
const HALF_DAY = 25

//无法确认是否维护后会重置,可能有数秒的误差
const dayTime = dayjs('Wed, 28 Jun 2023 15:12:07 GMT')
const DayTime: React.FC = () => {
  const duration = dayjs.duration(dayjs().diff(dayTime))
  const minutes = duration.asMinutes()
  const dayMinutes = minutes % DAY
  const isDay = dayMinutes < HALF_DAY
  return (
    <Card padding={5}>
      <Center mb={5}>
        <Heading size="md">
          现在是: {isDay ? '白天' : '夜晚'} 距离{isDay ? '夜晚' : '白天'}还有:
          {(HALF_DAY - (dayMinutes % HALF_DAY)).toFixed(0)}分钟
        </Heading>
      </Center>
      <Divider />
      <Box mt={5}>
        <Center>
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
