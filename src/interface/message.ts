import {ITransferActions} from './'

export interface IMsg extends IMsgType {
}
//------------------------for redux---------------------
export interface IMsgState {
  [K: string]: IMsg[]
}

interface IActionsMap {
  appendMsg: IMsg
}
export type IMsgAction = ITransferActions<IActionsMap>