import {ITransferActions} from '.'

export type IAvatarState = Record<string, string | undefined>

interface IActionsMap {
  setAvatar: IAvatarState
}
export type IAvatarActions = ITransferActions<IActionsMap>