import {ITransferActions} from '.'
export interface IStoreChat extends IChatType {
  timestamp?: number
  draft?: string
  unRead?: number
}
export interface IChatState {
  list: IStoreChat[]
  current: IStoreChat | undefined
}

export type ICreateType = Required<Pick<IStoreChat, 'chatId' | 'type' | 'isTop'>> & Partial<IStoreChat>

export type IUpdateType = Required<Pick<IStoreChat, 'chatId'>> & Partial<IStoreChat>

interface IActionsMap {
  setChatList: IStoreChat[]
  addChat: IStoreChat
  updateChat: IStoreChat
  removeChat: IStoreChat
  setCurrentChat: IStoreChat
}
export type IChatActions = ITransferActions<IActionsMap>