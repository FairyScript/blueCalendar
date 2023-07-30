import { mergeDeep } from '@/utils/mergeDeep'
import { useConst } from '@chakra-ui/react'
import { createContext, useContext, useEffect } from 'react'
import { proxy, subscribe } from 'valtio'
import { devtools, useProxy } from 'valtio/utils'

const initStore = {
  clock: {
    enabled: false,
    beforeMin: 3,
    dayTime: false,
    raid: false,
  },
  board: {
    hideCompleted: false,
    queryUncompleted: false,
    // 0: 未完成 1: 已完成
    completed: {} as Record<number, 0 | 1>,
    toggleQuest(id: number, force?: 0 | 1) {
      if (force !== undefined) {
        this.completed[id] = force
        return
      }
      if (this.completed[id] === 1) {
        this.completed[id] = 0
      } else {
        this.completed[id] = 1
      }
    },
    toggleQuestBatch(ids: number[], force: 0 | 1) {
      for (const id of ids) {
        this.toggleQuest(id, force)
      }
    },
  },
}

function createStore() {
  let state = initStore
  try {
    const storageState = JSON.parse(localStorage.getItem('store') || '{}')
    state = mergeDeep({}, initStore, storageState)
  } catch (error) {
    console.error('store storage parse error', error)
  }
  const store = proxy(state)
  return store
}

export type IStore = typeof initStore
const StoreContext = createContext<IStore>(initStore)

export const StoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const store = useConst(() => {
    return createStore()
  })

  //middleware
  useStorage(store)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

//storage middleware
function useStorage(store: typeof initStore) {
  useEffect(() => {
    const h = subscribe(store, () => {
      localStorage.setItem('store', JSON.stringify(store))
    })
    return () => h()
  }, [store])

  useEffect(() => {
    if (import.meta.env.DEV) {
      devtools(store, {
        name: 'store',
        enabled: true,
      })

      return () => {
        devtools(store, {
          name: 'store',
          enabled: false,
        })
      }
    }
  }, [store])
}

export function useStoreRef() {
  return useContext(StoreContext)
}

export function useStore() {
  return useProxy(useStoreRef())
}
