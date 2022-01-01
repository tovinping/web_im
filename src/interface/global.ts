import {ITransferActions} from '../interface'

export interface IGlobalState {
  isLogin: boolean
  account: string
  windowSize: 'maxSize' | 'minSize' | 'normalSize'
  windowVisible: 'hide' | 'show'
  contactSelect: {
    visible: boolean
    selected?: string[]
    callback?: Function
  },
}

interface IActionsMap {
  updateGlobal: Partial<IGlobalState>
  updateLogin: IGlobalState['isLogin']
  updateAccount: IGlobalState['account']
  updateContactSelect: IGlobalState['contactSelect']
}
export type IGlobalActions = ITransferActions<IActionsMap>