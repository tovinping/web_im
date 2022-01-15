import {ITransferActions} from './'

export interface IMsg extends IMsgType {
}
//------------------------for redux---------------------
export interface IMsgState {
  [K: string]: IMsg[]
}

interface IActionsMap {
  appendMsg: IMsg,
  updateMsg: Partial<IMsg> & Required<Pick<IMsg, 'chatId'>> 
}
export type IMsgAction = ITransferActions<IActionsMap>