import { IRootDispatchType, IRootStateType } from 'src/store'
export * from './user'
export * from './global'
export * from './chat'
export * from './message'
export * from './group'
export * from './member'
export * from './avatar'
export * from './status'
export type ITransferActions<T> = {
  [K in keyof T]: {
    type: K
    payload: T[K]
  }
}[keyof T]

export interface IResBase<T = any> {
  /** 0成功1失败 */ 
  code: 0 | 1
  body: T | null
  msg: string
}

declare global {
  interface Window {
    $state: IRootStateType
    $dispatch: IRootDispatchType
    handleBroadcast<T = any>(channel: string, payload?: T): void
    /** 是否已经自动登录过 */
    isAutoLogin: boolean
  }
}
