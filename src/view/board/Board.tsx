import { IBoardLoaderData, boardDataLoader } from '@/loader/boardLoader'
import { Box, Card, Container, Flex } from '@chakra-ui/react'
import { Suspense, memo } from 'react'
import { Await, useAsyncValue } from 'react-router-dom'
import BoardList from './BoardList'
import QuestList from './QuestList'
import { BoardStoreProvider } from '@/store/boardStore'

const Board: React.FC = () => {
  const data = boardDataLoader()
  return (
    <Container h="100vh" maxW="140ch" pt={10} pb={10}>
      <Suspense fallback={<FallBack />}>
        <Await resolve={data}>
          <AdventureBoard />
        </Await>
      </Suspense>
    </Container>
  )
}

export default memo(Board)

export function useBoardData() {
  return useAsyncValue() as IBoardLoaderData
}

const AdventureBoard: React.FC = () => {
  return (
    <BoardStoreProvider>
      <Card height="100%" padding={4}>
        <Flex h="100%" overflow="hidden" gap={16}>
          <BoardList />
          <QuestList />
        </Flex>
      </Card>
    </BoardStoreProvider>
  )
}

const FallBack: React.FC = () => {
  return <Box>加载中...</Box>
}
