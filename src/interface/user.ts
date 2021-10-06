import { ITransferActions } from '.'
export type IUserState = Record<string, IUserType | undefined>

interface IActionsMap {
  setUser: IUserState
}
export type IUserActions = ITransferActions<IActionsMap>
