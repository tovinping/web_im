import { DEVICE_TYPE, MSG_STATE, MSG_TYPE } from 'src/constant'
import { getRandomStr } from 'src/utils'

type ISendType = Pick<IMsgType, 'chatId' | 'content' | 'chatType'>
export function getMsgTemplate(data: ISendType): IMsgType {
  const account = window.$state.global.account
  const userInfo = window.$state.user.map[account]
  return {
    msgId: getRandomStr(),
    timestamp: Date.now(),
    type: MSG_TYPE.TEXT,
    state: MSG_STATE.SENDING,
    account,
    name: userInfo?.name || '',
    ...data,
    deviceType: DEVICE_TYPE.WEB,
  }
}
