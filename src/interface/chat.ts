import {ITransferActions} from '.'
export interface IChatExt extends IChatType {
  timestamp?: number
  draft?: string
  unRead?: number
}
export interface IChatState {
  list: IChatExt[]
  current: IChatExt | undefined
}

export type ICreateType = Required<Pick<IChatExt, 'chatId' | 'type' | 'topState'>> & Partial<IChatExt>

export type IUpdateType = Required<Pick<IChatExt, 'chatId'>> & Partial<IChatExt>

interface IActionsMap {
  setChatList: IChatExt[]
  addChat: IChatExt
  updateChat: IChatExt
  removeChat: IChatExt
  setCurrentChat: IChatExt
}
export type IChatActions = ITransferActions<IActionsMap>