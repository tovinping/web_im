import { ITransferActions } from '.'
import { IBaseGroup } from 'src/typings'
export interface IGroupInfo extends IBaseGroup {}

export type IGroupState = Record<string, IGroupInfo | undefined>
export type IUpdateGroupType = Required<Pick<IGroupInfo, 'groupId'>> & Partial<IGroupInfo>

interface IActionsMap {
  setGroup: IGroupState
  updateGroup: IUpdateGroupType
}

export type IGroupActions = ITransferActions<IActionsMap>
