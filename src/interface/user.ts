import { ITransferActions } from '.'
export interface IStoreUser extends IUserType {
  isCache?: boolean
}
export type IUserState = Record<string, IStoreUser | undefined>

interface IActionsMap {
  setUser: IUserState
  updateUser: Partial<IStoreUser> & { account: string }
}
export type IUserActions = ITransferActions<IActionsMap>
