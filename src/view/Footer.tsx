import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { memo } from 'react'

const Footer: React.FC = () => {
  return (
    <Box as="footer" py={8} bg="gray.800" color="white">
      <Flex justify="center" align="center">
        <Text fontSize="sm" mr={2}>
          Created by FairyScript
        </Text>
        <Link href="https://github.com/FairyScript/blueCalendar" isExternal>
          <Flex align="center">
            <Text ml={2}>GitHub</Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}

export default memo(Footer)
