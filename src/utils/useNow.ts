import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useId } from 'react'

const cb: {
  [id: string]: () => void
} = {}

setInterval(() => {
  for (const id in cb) {
    cb[id]()
  }
}, 100)

export function useNow() {
  const id = useId()
  const [_, set] = useState(0)
  useEffect(() => {
    cb[id] = () => {
      set(c => c + 1)
    }
    return () => {
      delete cb[id]
    }
  }, [])

  return dayjs()
}
