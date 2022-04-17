import { storeApi } from 'src/api'

export * from './chat'
export * from './msg'

export function getCurrentLoginAccount() {
  return storeApi.getState().global.account
}
