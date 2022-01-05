import { ITransferActions } from '.'
export type IUserState = Record<string, IUserType | undefined>

interface IActionsMap {
  setUser: IUserState
  updateUser: Partial<IUserType> & {account: string}
}
export type IUserActions = ITransferActions<IActionsMap>
