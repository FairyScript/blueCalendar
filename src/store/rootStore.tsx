import { createContext, useContext, useRef } from 'react'
import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

const initStore = {
  current: Date.now(),
}

const createStore = () => proxy(initStore)

const StoreContext = createContext(initStore)

export const StoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const store = useRef(createStore()).current
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStoreRef() {
  return useContext(StoreContext)
}

export function useStore() {
  return useProxy(useStoreRef())
}
