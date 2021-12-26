import { autoLogin, getContactList, login } from 'src/api'
import { getRsaEncrypt } from './encrypt'
import { getRefreshToken, setRefreshToken, setToken } from './storage'
export async function queryContactList(pageNo = 1) {
  const result = await getContactList({ pageNo, pageSize: 20 })
  const oldUserMap = window.$state.user
  const userMap = { ...oldUserMap }
  if (result.code === 0) {
    result.data?.forEach(item => {
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
  if (result.code === 0 && result.data) {
    setToken(result.data.token)
    setRefreshToken(result.data.refreshToken)
    return true
  } else {
    return false
  }
}
export async function doAutoLogin() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false
  const result = await autoLogin(refreshToken)
  if (result.code === 0 && result.data) {
    setToken(result.data.token)
    setRefreshToken(result.data.refreshToken)
    return true
  } else {
    return false
  }
}
