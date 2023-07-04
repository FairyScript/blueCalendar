import { Box, Center, Heading } from '@chakra-ui/react'
import { memo } from 'react'
import {
  NotificationSwitch,
  type NotificationSwitchKey,
} from '../Notifications'

interface ICardHeaderProps {
  title: string
  notifiKey: NotificationSwitchKey
}

const CardHeader: React.FC<ICardHeaderProps> = ({ title, notifiKey }) => {
  return (
    <Center mb={5}>
      <Heading size="md">{title}</Heading>
      <Box pos="absolute" right={5}>
        <NotificationSwitch notifiKey={notifiKey} />
      </Box>
    </Center>
  )
}

export default memo(CardHeader)
