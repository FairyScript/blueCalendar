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
  return (
    <Popover>
      <PopoverTrigger>
        <SettingsIcon />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>设置</PopoverHeader>
        <PopoverBody>
          <NotifiSetting />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
})

const NotifiSetting: React.FC = () => {
  const canPostNotification =
    Notification.permission && Notification.permission !== 'denied'
  if (!canPostNotification) {
    return (
      <Flex direction="column">
        <FormLabel mb="2" display="flex" alignItems="center">
          <Text color="red.500">您的浏览器不支持通知或通知权限被拒绝</Text>
        </FormLabel>
      </Flex>
    )
  }

  return (
    <Flex direction="column">
      <NotifiEnabled />
      <NotifiTime />
    </Flex>
  )
}

const NotifiEnabled: React.FC = () => {
  const store = useStore()

  return (
    <FormLabel mb="2" display="flex" alignItems="center">
      <Text mr={2} userSelect="none">
        启用网页提醒
      </Text>
      <Switch
        isChecked={store.clock.enabled}
        onChange={e => {
          const checked = e.target.checked
          if (checked) {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                store.clock.enabled = checked
              }
            })
            return
          } else {
            store.clock.enabled = checked
          }
        }}
      />
    </FormLabel>
  )
}

const NotifiTime: React.FC = () => {
  const store = useStore()
  return (
    <FormLabel mb="0" display="flex" alignItems="center">
      提醒提前
      <NumberInput
        size="sm"
        width={20}
        ml={2}
        mr={2}
        value={store.clock.beforeMin}
        onChange={(_, e) => {
          store.clock.beforeMin = e
        }}
      >
        <NumberInputField />
      </NumberInput>
      分钟
    </FormLabel>
  )
}

export type NotificationSwitchKey = 'dayTime' | 'raid'

export const NotificationSwitch: React.FC<{
  notifiKey: NotificationSwitchKey
}> = ({ notifiKey }) => {
  const store = useStore()

  if (!store.clock.enabled) return null
  return (
    <Flex alignItems="center" gap={2}>
      <BellIcon />
      <Switch
        isChecked={store.clock[notifiKey]}
        onChange={e => {
          store.clock[notifiKey] = e.target.checked
        }}
      />
    </Flex>
  )
}
