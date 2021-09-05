import { ITransferActions } from '.'
import { IBaseMemberInfo } from 'src/typings'
export interface IMemberInfo extends IBaseMemberInfo {}

export type IMemberState = Record<string, IMemberInfo[] | undefined>
export type IUpdateMember = Partial<IMemberInfo> & Required<Pick<IMemberInfo, 'account' | 'groupId'>>
interface IActionsMap {
  setMember: IMemberState
  updateMember: IUpdateMember
  removeMember: {groupId: string, accounts: string[]}
}

export type IMemberActions = ITransferActions<IActionsMap>
