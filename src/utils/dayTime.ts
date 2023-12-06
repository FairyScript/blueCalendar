import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

//1昼夜 50min 25min 昼 25min 夜
const DAY = 50
const HALF_DAY = 25

export function getDayTime(now: Dayjs) {
  const dayTime = getDayStart(now)
  const minutes = dayjs.duration(now.diff(dayTime)).asMinutes()
  const isDay = minutes % DAY < HALF_DAY
  const nextDayTime = dayTime
    .add(Math.ceil(minutes / HALF_DAY) * HALF_DAY, 'minute')
    .local()
  const minutesToNext = HALF_DAY - (minutes % HALF_DAY)

  return {
    isDay,
    nextDayTime,
    minutesToNext,
  }
}

function getDayStart(now: Dayjs) {
  const tokyo = now.tz('Asia/Tokyo')
  // 东京时间 08:57:10 ~ 09:12:10 之间为 15 分钟夜晚
  const shortNight = tokyo.hour(8).minute(57).second(10)
  if (tokyo.isAfter(shortNight)) {
    // 以 09:12:10 为日出，倒推 50 分钟
    return tokyo.hour(8).minute(22).second(10)
  } else {
    // 以 08:32:10 为日出，倒推 50 分钟 * 11 周期，到达前一天的最后一个日出
    return tokyo.hour(8).minute(32).second(10).subtract(550, 'minute')
  }
}
