import { useStore } from '@/store/rootStore'
import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

/**
 *  月曜日 ～ 金曜日	
 *    1回目　14:00 ～ 15:00
      2回目　18:00 ～ 19:00
      3回目　22:00 ～ 23:00
    土曜日 ～ 日曜日	
      1回目　08:00 ～ 09:00
      2回目　12:00 ～ 13:00
      3回目　16:00 ～ 17:00
      4回目　20:00 ～ 21:00
      5回目　翌01:00 ～ 翌02:00 
 */

const table = [
  [1, 8, 12, 16, 20],
  [1, 14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [8, 12, 16, 20],
]
const dayCount = table.map(h => h.length)
const flatTable = table.flat()

function getNextRaid(current: Dayjs, count: number) {
  const now = dayjs(current).tz('Asia/Tokyo')
  const day = now.day()
  const hour = now.hour()

  const result: Dayjs[] = []

  //find now in table
  const preDayCount = dayCount.slice(0, day).reduce((a, b) => a + b, 0)
  const hourIndex = table[day].findIndex(h => h > hour)
  const index = preDayCount + (hourIndex !== -1 ? hourIndex : dayCount[day])
  const nextHours = getCircularValues(flatTable, index, count)

  let next = now
  for (const hour of nextHours) {
    next = getNextTime(next, hour)
    result.push(next)
  }

  return result
}

function isOpen(current: Dayjs) {
  return table[current.day()].includes(current.hour())
}

const Raid: React.FC = () => {
  const { current } = useStore()
  const now = dayjs(current).tz('Asia/Tokyo')
  const open = isOpen(now)

  return (
    <Card padding={5}>
      <Center mb={5}>
        <Heading size="md">Raid</Heading>
      </Center>
      <Divider />
      <Box mt={5}>
        {open ? <RaidOpen now={now} /> : <RaidClose now={now} />}
      </Box>
      <FutureRaid now={now} />
    </Card>
  )
}

export default Raid

interface RaidItemProps {
  now: Dayjs
}

const RaidOpen: React.FC<RaidItemProps> = ({ now }) => {
  const closeTime = now.add(1, 'hour').startOf('hour')
  const duration = dayjs.duration(closeTime.diff(now))
  const closeStr = duration.format('HH:mm:ss')
  return (
    <Flex direction="column" align="center">
      <Text>正在进行中,结束时间:</Text>
      <Text fontSize={30} as="b" color="green">
        {closeStr}
      </Text>
    </Flex>
  )
}

const RaidClose: React.FC<RaidItemProps> = ({ now }) => {
  const next = getNextRaid(now, 1)[0].local()
  const duration = dayjs.duration(next.diff(now))
  const openStr = duration.format('HH:mm:ss')

  return (
    <Flex direction="column" align="center">
      <Text>还没开始, 距离下次Raid还有</Text>
      <Text fontSize={30} as="b">
        {openStr}
      </Text>
    </Flex>
  )
}

const FutureRaid: React.FC<RaidItemProps> = ({ now }) => {
  const future = getNextRaid(now, 3)
  return (
    <div>
      <Text>未来3次Raid</Text>
      {future.map((time, index) => (
        <Text key={index}>{time.local().format('YYYY-MM-DD HH:mm')}</Text>
      ))}
    </div>
  )
}

function getCircularValues<T = any>(
  array: T[],
  index: number,
  count: number
): T[] {
  const len = array.length
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(array[(index + i) % len])
  }
  return result
}

function getNextTime(current: Dayjs, hour: number) {
  const now = current.tz('Asia/Tokyo')
  const next = now.hour(hour).startOf('hour')
  if (now.isAfter(next)) {
    return next.add(1, 'day')
  }
  return next
}
