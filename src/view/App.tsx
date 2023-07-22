import { useStoreRef } from '@/store/rootStore'
import { useEffect } from 'react'
import { subscribe } from 'valtio'
import { deepCopy } from '@/utils/deepCopy'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  useWorker()
  return <Outlet />
}

export default App

function useWorker() {
  const store = useStoreRef()
  useEffect(() => {
    const w = new Worker(new URL('../worker/worker.ts', import.meta.url), {
      type: 'module',
    })
    const h = subscribe(store.clock, () => {
      w.postMessage(deepCopy(store.clock))
    })

    w.postMessage(deepCopy(store.clock))

    return () => {
      w.terminate()
      h()
    }
  }, [])
}
