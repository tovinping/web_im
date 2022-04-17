import { storeApi } from 'src/api'
import { ISendMsgShortcutKey } from 'src/store/global'

export * from './chat'
export * from './msg'
export * from './group'
export * from './member'
export * from './user'
export * from './login'

export function updateSendMsgShortcutKey(type: ISendMsgShortcutKey) {
  storeApi.updateMsgSendShortcutKey(type)
}
