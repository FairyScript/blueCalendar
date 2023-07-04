import { useStore } from '@/store/rootStore'
import { BellIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  FormLabel,
  Switch,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import { memo } from 'react'

export const NotifiController: React.FC = memo(() => {
  const store = useStore()
  const clock = store.clock

  return (
    <Popover>
      <PopoverTrigger>
        <SettingsIcon />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>设置</PopoverHeader>
        <PopoverBody>
          <Flex direction="column">
            <FormLabel mb="2" display="flex" alignItems="center">
              <Text mr={2} userSelect="none">
                启用网页提醒
              </Text>
              <Switch
                id="clock-enabled"
                isChecked={clock.enabled}
                onChange={e => {
                  store.clock.enabled = e.target.checked
                }}
              />
            </FormLabel>
            <FormLabel mb="0" display="flex" alignItems="center">
              提醒提前
              <NumberInput
                size="sm"
                width={20}
                ml={2}
                mr={2}
                value={clock.beforeMin}
                onChange={(_, e) => {
                  store.clock.beforeMin = e
                }}
              >
                <NumberInputField />
              </NumberInput>
              分钟
            </FormLabel>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
})

export type NotificationSwitchKey = 'dayTime' | 'raid'

export const NotificationSwitch: React.FC<{
  notifiKey: NotificationSwitchKey
}> = ({ notifiKey }) => {
  const store = useStore()
  const clock = store.clock
  return (
    <Flex alignItems="center" gap={2}>
      <BellIcon />
      <Switch
        isChecked={clock[notifiKey]}
        onChange={e => {
          store.clock[notifiKey] = e.target.checked
        }}
      />
    </Flex>
  )
}
