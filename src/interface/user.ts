import { ITransferActions } from '.'
import { IBaseUser } from '../../../typings'
export interface IUser extends IBaseUser{}
export type IUserState = Record<string, IUser | undefined>

interface IActionsMap {
  setUser: IUserState
}
export type IUserActions = ITransferActions<IActionsMap>
