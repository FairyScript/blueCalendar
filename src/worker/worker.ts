import { getDayTime } from '@/utils/dayTime'
import { getNextRaid } from '@/utils/raidTime'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import durationPlugin from 'dayjs/plugin/duration'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(durationPlugin)
const config = {
  enabled: false,
  beforeMin: 3,
  dayTime: false,
  raid: false,
}

const timeSpan = {
  dayTime: 0,
  raid: 0,
}

addEventListener('message', e => {
  Object.assign(config, e.data)
})

setInterval(tick, 1000 * 30)

function tick() {
  const now = dayjs()
  const nextRaid = getNextRaid(now, 1)[0]
  const { minutesToNext, nextDayTime, isDay } = getDayTime(now)
  if (!config.enabled) {
    return
  }

  const shouldDayTime =
    config.dayTime &&
    minutesToNext < config.beforeMin &&
    timeSpan.dayTime < now.unix()

  if (shouldDayTime) {
    new Notification('日夜切换', {
      body: `还有${minutesToNext.toFixed(0)}分钟切换到${
        isDay ? '夜晚' : '白天'
      }`,
    })
    timeSpan.dayTime = nextDayTime.add(1, 'minute').unix()
  }

  const raidRemain = dayjs.duration(nextRaid.diff(now)).asMinutes()
  const shouldRaid =
    config.raid && raidRemain < config.beforeMin && timeSpan.raid < now.unix()

  if (shouldRaid) {
    new Notification('团本提醒', {
      body: `距离团本开始还有${raidRemain.toFixed(0)}分钟`,
    })
    timeSpan.raid = nextRaid.add(1, 'minute').unix()
  }
}

export default {}
