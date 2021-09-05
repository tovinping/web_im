import {IBaseConversation} from '../../../typings'
import {ITransferActions} from '../interface'
export interface IConversation extends IBaseConversation {
  timestamp?: number
  draft?: string
  unRead?: number
}
export interface IConversationState {
  list: IConversation[]
  current: IConversation | undefined
}

export type ICreateType = Required<Pick<IConversation, 'conversationId' | 'type' | 'topState'>> & Partial<IConversation>

export type IUpdateType = Required<Pick<IConversation, 'conversationId'>> & Partial<IConversation>

interface IActionsMap {
  setConversationList: IConversation[]
  addConversation: IConversation
  updateConversation: IConversation
  removeConversation: IConversation
  setCurrentConversation: IConversation
}
export type IConversationActions = ITransferActions<IActionsMap>