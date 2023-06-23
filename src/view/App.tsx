import { useStore } from '@/store/rootStore'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import Raid from './Raid'
import { Card, Center, Container, Flex, Heading } from '@chakra-ui/react'

const App: React.FC = () => {
  useTimer()
  return (
    <Container>
      <Flex direction="column" gap={5}>
        <Center>
          <Heading size="lg" fontSize="50px">
            BLUE CALENDAR
          </Heading>
        </Center>
        <Now />
        <Raid />
      </Flex>
    </Container>
  )
}

export default App

function useTimer() {
  const store = useStore()

  useEffect(() => {
    const timer = setInterval(() => {
      store.current = Date.now()
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])
}

const Now: React.FC = () => {
  const store = useStore()
  const timeStr = dayjs(store.current).format('YYYY-MM-DD HH:mm:ss')
  return (
    <Card>
      <Center padding={5}>
        <Heading size="md">现在时间是: {timeStr}</Heading>
      </Center>
    </Card>
  )
}
