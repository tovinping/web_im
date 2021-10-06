import { ITransferActions } from '.'
export interface IGroupInfo extends IGroupType {}

export type IGroupState = Record<string, IGroupInfo | undefined>
export type IUpdateGroupType = Required<Pick<IGroupInfo, 'groupId'>> & Partial<IGroupInfo>

interface IActionsMap {
  setGroup: IGroupState
  updateGroup: IUpdateGroupType
}

export type IGroupActions = ITransferActions<IActionsMap>
