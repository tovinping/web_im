import { message } from 'antd'
import {
  autoLogin,
  getContactList,
  getUserInfo,
  IRegister,
  login,
  register,
  updateAvatar,
  updateSign,
  forget,
  uploadFile,
} from 'src/api'
import { myHistory } from '.'
import { getRsaEncrypt } from './encrypt'
import { getMyAccount, getRefreshToken, setMyAccount, setRefreshToken, setToken } from './storage'

export async function handRegister(data: IRegister) {
  const rsaPwd = await getRsaEncrypt(data.password)
  const result = await register({ ...data, password: rsaPwd })
  if (result.code === 0) {
    myHistory.replace('/')
  } else {
    message.error(result.msg, 1)
  }
}

export async function doLogin({ password, account, ...other}: Parameters<typeof login>[number]) {
  const rsaPwd = await getRsaEncrypt(password)
  const { code, body, msg } = await login({ ...other, account, password: rsaPwd })
  if (code === 0 && body) {
    setMyAccount(account)
    window.$dispatch({ type: 'updateGlobal', payload: { isLogin: true, account } })
    setToken(body.token)
    setRefreshToken(body.refreshToken)
  } else {
    message.error(msg, 1)
  }
  return code
}
export async function doAutoLogin() {
  const myAccount = getMyAccount()
  if (!myAccount) return
  const refreshToken = getRefreshToken()
  if (!refreshToken) return
  const result = await autoLogin(refreshToken)
  if (result.code === 0 && result.body) {
    window.$dispatch({ type: 'updateGlobal', payload: { account: myAccount, isLogin: true } })
    setToken(result.body.token)
    setRefreshToken(result.body.refreshToken)
  } else {
    message.error('密码已过期,请重新登录', 1)
  }
  return result.code
}
export async function logout() {
  setMyAccount('')
  myHistory.replace('/')
}

export async function getUserInfoByAccounts(accounts: string[]) {
  return getContactList({ accounts })
}

export async function syncMyInfo() {
  const myAccount = window.$state.global.account
  const { body } = await getUserInfo(myAccount)
  if (body) {
    window.$dispatch({ type: 'setUser', payload: { [myAccount]: body } })
  }
}

export async function handUpdateAvatar(file: File) {
  const uploadRes = await uploadFile(file)
  const avatarUrl = uploadRes.body
  if (avatarUrl) {
    const updateRes = await updateAvatar(avatarUrl)
    if (updateRes.code === 0) {
      const myAccount = window.$state.global.account
      window.$dispatch({ type: 'updateUser', payload: { account: myAccount, avatar: avatarUrl } })
    }
  } else {
    message.error('上传头像失败', 1)
  }
}
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
export async function handForget(params: Parameters<typeof forget>[number]) {
  const rsaPwd = await getRsaEncrypt(params.password)
  const result = await forget({ ...params, password: rsaPwd })
  console.log('TANG===', result)
}
export async function handUpdateSign(sign: string) {
  const { code } = await updateSign(sign)
  if (code === 0) {
    const myAccount = window.$state.global.account
    window.$dispatch({ type: 'updateUser', payload: { account: myAccount, sign } })
  }
}
