import { ITransferActions } from '.'
export type ILastMsgState = Record<string, IMsgType | undefined>

interface IActionsMap {
  setLastMsg: ILastMsgState
  updateLastMsg: IMsgType & Required<Pick<IMsgType, 'chatId'>>
}
export type ILastMsgActions = ITransferActions<IActionsMap>
