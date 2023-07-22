import { Container, Flex, Center, Heading, Card } from '@chakra-ui/react'
import DayTime from './DayTime'
import Footer from './Footer'
import Raid from './Raid'
import { useNow } from '@/utils/useNow'
import { NotifiController } from './Notifications'

const Clock: React.FC = () => {
  return (
    <Container>
      <Flex direction="column" gap={5}>
        <Center>
          <Heading size="lg" fontSize="50px">
            BLUE CALENDAR
          </Heading>
        </Center>
        <Now />
        <DayTime />
        <Raid />
        <Footer />
      </Flex>
    </Container>
  )
}

export default Clock

const Now: React.FC = () => {
  const timeStr = useNow().format('YYYY-MM-DD HH:mm:ss')
  return (
    <Card>
      <Center padding={5} alignItems="center">
        <Heading size="md">现在时间是: {timeStr}</Heading>
        <Flex ml={3}>
          <NotifiController />
        </Flex>
      </Center>
    </Card>
  )
}
