import {ITransferActions} from '.'
interface IStatus {
  isMobile: boolean
  /** 0离线1在线2离线3忙碌 */
  status: 0 | 1 | 2 | 3
}
export type IStatusState = Record<string, IStatus | undefined>

interface IActionsMap {
  setStatus: IStatusState
}
export type IStatusActions = ITransferActions<IActionsMap>