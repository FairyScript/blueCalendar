import { useStore } from '@/store/rootStore'
import { getNextRaid, raidIsOpen } from '@/utils/raidTime'
import { Box, Card, Divider, Flex, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { memo } from 'react'
import CardHeader from './components/CardHeader'

const Raid: React.FC = () => {
  const { current } = useStore()
  const now = dayjs(current).tz('Asia/Tokyo')
  const open = raidIsOpen(now)

  return (
    <Card padding={5}>
      <CardHeader title="团本" notifiKey="raid" />

      <Divider />
      <Box mt={5}>
        {open ? <RaidOpen now={now} /> : <RaidClose now={now} />}
      </Box>
      <FutureRaid now={now} />
    </Card>
  )
}

export default memo(Raid)

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
