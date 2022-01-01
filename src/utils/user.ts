import { autoLogin, getContactList, getUserInfo, login } from 'src/api'
import { getRsaEncrypt } from './encrypt'
import { getRefreshToken, setRefreshToken, setToken } from './storage'
export async function queryContactList(pageNo = 1) {
  const result = await getContactList({ pageNo, pageSize: 20 })
  const oldUserMap = window.$state.user
  const userMap = { ...oldUserMap }
  if (result.code === 0) {
    result.body?.forEach(item => {
      userMap[item.account] = item
    })
    console.log('loadContactList', userMap)
    window.$dispatch({ type: 'setUser', payload: userMap })
  }
}

interface IDoLogin {
  account: string
  password: string
}
export async function doLogin({ account, password }: IDoLogin) {
  const rsaPwd = await getRsaEncrypt(password)
  const result = await login({ account, password: rsaPwd })
  if (result.code === 0 && result.body) {
    setToken(result.body.token)
    setRefreshToken(result.body.refreshToken)
    return true
  } else {
    return false
  }
}
export async function doAutoLogin() {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false
  const result = await autoLogin(refreshToken)
  if (result.code === 0 && result.body) {
    setToken(result.body.token)
    setRefreshToken(result.body.refreshToken)
    return true
  } else {
    return false
  }
}

export async function getUserInfoByAccounts(accounts: string[]) {
  return getContactList({ accounts })
}

export async function syncMyInfo() {
  const myAccount = window.$state.global.account
  const { body } = await getUserInfo(myAccount)
  if (body) {
    window.$dispatch({ type: 'updateMyInfo', payload: body })
  }
}
