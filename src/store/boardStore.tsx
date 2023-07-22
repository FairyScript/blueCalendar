import { useConst } from '@chakra-ui/react'
import { createContext, useContext, useEffect } from 'react'
import { proxy } from 'valtio'
import { devtools, useProxy } from 'valtio/utils'

const initStore = {
  mapIds: [] as string[],
  conditionTypes: [] as number[],
  setTag<T extends IBoardTagType>(
    type: T,
    name: T extends 'mapIds' ? string : number,
    action: 'add' | 'remove'
  ) {
    const list = this[type]
    if (action === 'add') {
      //@ts-expect-error
      if (!list.includes(name)) {
        //@ts-expect-error
        list.push(name)
      }
    } else {
      //@ts-expect-error
      const index = list.indexOf(name)
      if (index !== -1) {
        list.splice(index, 1)
      }
    }
  },
}

export type IBoardTagType = 'mapIds' | 'conditionTypes'

function createStore() {
  const store = proxy(initStore)
  return store
}

export type IBoardStore = typeof initStore
const StoreContext = createContext<IBoardStore>(initStore)

export const BoardStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const store = useConst(() => {
    return createStore()
  })

  useEffect(() => {
    if (import.meta.env.DEV) {
      devtools(store, {
        name: 'boardStore',
        enabled: true,
      })

      return () => {
        devtools(store, {
          name: 'boardStore',
          enabled: false,
        })
      }
    }
  }, [store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function useBoardStoreRef() {
  return useContext(StoreContext)
}

export function useBoardStore() {
  return useProxy(useBoardStoreRef())
}
