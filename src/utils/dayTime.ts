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
  //无法确认是否维护后会重置,可能有数秒的误差
  const newDay = now.tz('Asia/Tokyo').startOf('h').hour(5).minute(2).second(10)
  //TODO 在东京时间5:20-9:45之间,发生了跳变.暂时无法确认具体时间点
  const isnewDay = now.isAfter(newDay)
  return isnewDay ? newDay : newDay.subtract(1, 'day')
}
