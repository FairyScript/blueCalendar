import type { Dayjs } from 'dayjs'
/**
 *  月曜日 ～ 金曜日	
 *    1回目　14:00 ～ 15:00
      2回目　18:00 ～ 19:00
      3回目　22:00 ～ 23:00
    土曜日 ～ 日曜日	
      1回目　08:00 ～ 09:00
      2回目　12:00 ～ 13:00
      3回目　16:00 ～ 17:00
      4回目　20:00 ～ 21:00
      5回目　翌01:00 ～ 翌02:00 
 */

const table = [
  [1, 8, 12, 16, 20],
  [1, 14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [14, 18, 22],
  [8, 12, 16, 20],
]
const dayCount = table.map(h => h.length)
const flatTable = table.flat()

export function getNextRaid(current: Dayjs, count: number) {
  const now = current.tz('Asia/Tokyo')
  const day = now.day()
  const hour = now.hour()

  const result: Dayjs[] = []

  //find now in table
  const preDayCount = dayCount.slice(0, day).reduce((a, b) => a + b, 0)
  const hourIndex = table[day].findIndex(h => h > hour)
  const index = preDayCount + (hourIndex !== -1 ? hourIndex : dayCount[day])
  const nextHours = getCircularValues(flatTable, index, count)

  let next = now
  for (const hour of nextHours) {
    next = getNextTime(next, hour)
    result.push(next)
  }

  return result
}

export function raidIsOpen(current: Dayjs) {
  return table[current.day()].includes(current.hour())
}

export function getCircularValues<T = any>(
  array: T[],
  index: number,
  count: number
): T[] {
  const len = array.length
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(array[(index + i) % len])
  }
  return result
}

function getNextTime(current: Dayjs, hour: number) {
  const now = current.tz('Asia/Tokyo')
  const next = now.hour(hour).startOf('hour')
  if (now.isAfter(next)) {
    return next.add(1, 'day')
  }
  return next
}
