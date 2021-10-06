import { login } from 'src/api'
import clientSocket from './clientSocket'
import { queryContactList } from 'src/utils'
interface IDoLogin {
  account: string
  password: string
}
export async function doLogin({ account, password }: IDoLogin) {
  const data = await login({ account, password })
  if (data.code !== 1) {
    window.$dispatch({ type: 'updateGlobal', payload: { isLogin: true, account } })
    clientSocket.init(account)
    queryContactList()
  }
  return data
}

interface IOpenParam {
  selected?: string[]
}

export function openContactSelect(param?: IOpenParam) {
  return new Promise<IUserType[]>(resolve => {
    window.$dispatch({
      type: 'updateContactSelect',
      payload: {visible: true, selected: param?.selected, callback: resolve}})
  })
}