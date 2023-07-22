import { ComponentType } from 'react'

export function lazyLoader(lazy: () => Promise<{ default: ComponentType }>) {
  return async () => {
    const { default: Component } = await lazy()
    return {
      Component,
    }
  }
}
