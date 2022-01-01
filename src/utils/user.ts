import { autoLogin, getContactList, getUserInfo, login } from 'src/api'
import { getRsaEncrypt } from './encrypt'
import { getMyAccount, getRefreshToken, setMyAccount, setRefreshToken, setToken } from './storage'
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
    setMyAccount(account)
    window.$dispatch({ type: 'updateGlobal', payload: { account } })
    setToken(result.body.token)
    setRefreshToken(result.body.refreshToken)
    return true
  } else {
    return false
  }
}
/**
 * 自动登录
 * @returns 0成功; -1没登录过; 1token过期
 */
export async function doAutoLogin() {
  const myAccount = getMyAccount()
  if (!myAccount) return '-1'
  const refreshToken = getRefreshToken()
  if (!refreshToken) return '1'
  const result = await autoLogin(refreshToken)
  if (result.code === 0 && result.body) {
    window.$dispatch({ type: 'updateGlobal', payload: { account: myAccount, isLogin: true } })
    setToken(result.body.token)
    setRefreshToken(result.body.refreshToken)
    return '0'
  } else {
    return '1'
  }
}

export async function getUserInfoByAccounts(accounts: string[]) {
  return getContactList({ accounts })
}

export async function syncMyInfo() {
  const myAccount = window.$state.global.account
  const { body } = await getUserInfo(myAccount)
  if (body) {
    window.$dispatch({ type: 'updateUser', payload: body })
  }
}
