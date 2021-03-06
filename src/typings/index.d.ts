import logger from '../utils/logger'
import { IRootDispatchType, IRootStateType } from 'src/store'

declare global {
  const COS: any
  interface Window {
    NodeBridge: {
      closeWindow(): void
      miniSize(): void
      maxSize(): void
      normalSize(): void
    }
    $state: IRootStateType
    $dispatch: IRootDispatchType
    getLogger: typeof logger
  }
  type INullType<T> = T | null | undefined
}

export type IActions<T> = {
  [K in keyof T]: {
    type: K
    payload: T[K]
  }
}[keyof T]

type IBaseShortcutKey = 'control.enter' | 'enter'
export type PartialShortcutKey<T extends IBaseShortcutKey> = T & IBaseShortcutKey
