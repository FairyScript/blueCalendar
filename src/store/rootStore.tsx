import { createContext, useContext, useEffect, useRef } from 'react'
import { proxy, subscribe } from 'valtio'
import { devtools, useProxy } from 'valtio/utils'

const initStore = {
  current: Date.now(),
  clock: {
    enabled: false,
    beforeMin: 3,
    dayTime: false,
    raid: false,
  },
}

function createStore() {
  const state = Object.assign({}, initStore)
  try {
    const storageState = JSON.parse(localStorage.getItem('store') || '{}')
    Object.assign(state, storageState)
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
  const store = useRef(createStore()).current

  //middleware
  useStorage(store)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

//storage middleware
function useStorage(store: typeof initStore) {
  useEffect(() => {
    const h = subscribe(store.clock, () => {
      const storage = {
        clock: store.clock,
      }
      localStorage.setItem('store', JSON.stringify(storage))
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
