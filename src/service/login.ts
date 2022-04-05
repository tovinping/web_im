import { message } from 'antd'
import {
  autoLogin,
  getContactList,
  IRegister,
  login,
  register,
  updateAvatar,
  updateSign,
  forgot,
  uploadFile,
} from 'src/api/server'
import { myHistory, getRsaEncrypt, storage } from 'src/utils'
import ClientSocket from 'src/utils/webSocket'

export async function handRegister(data: IRegister) {
  const rsaPwd = await getRsaEncrypt(data.password)
  const result = await register({ ...data, password: rsaPwd })
  if (result.code === 0) {
    myHistory.replace('/')
  } else {
    message.error(result.msg, 1)
  }
}

export async function doLogin({ password, account, ...other }: Parameters<typeof login>[number]) {
  const rsaPwd = await getRsaEncrypt(password)
  const { code, body, msg } = await login({ ...other, account, password: rsaPwd })
  if (code === 0 && body) {
    storage.setMyAccount(account)
    window.$dispatch({ type: 'updateGlobal', payload: { isLogin: true, account } })
    storage.setToken(body.token)
    ClientSocket.init(account, body.token)
    storage.setRefreshToken(body.refreshToken)
  } else {
    message.error(msg, 1)
  }
  return code
}
export async function doAutoLogin() {
  const myAccount = storage.getMyAccount()
  if (!myAccount) return
  const refreshToken = storage.getRefreshToken()
  if (!refreshToken) return
  const { code, body } = await autoLogin(myAccount, refreshToken)
  if (code === 0 && body) {
    window.$dispatch({ type: 'updateGlobal', payload: { account: myAccount, isLogin: true } })
    storage.setToken(body.token)
    storage.setRefreshToken(body.refreshToken)
    ClientSocket.init(myAccount, body.token)
  } else {
    storage.setToken('')
    storage.setRefreshToken('')
    storage.setMyAccount('')
  }
  return code
}
export async function logout() {
  storage.setMyAccount('')
  myHistory.replace('/')
}

export async function getUserInfoByAccounts(accounts: string[]) {
  const userMap = window.$state.user.map
  const requestIds: string[] = []
  accounts.forEach(acc => !userMap[acc]?.account && requestIds.push(acc))
  if (!requestIds.length) return
  const { body } = await getContactList({ accounts: requestIds })
  if (!body) return
  window.$dispatch({ type: 'updateUsers', payload: body })
}

export async function handUpdateAvatar(file: File) {
  const uploadRes = await uploadFile(file)
  const avatarUrl = uploadRes.body
  if (avatarUrl) {
    const updateRes = await updateAvatar(avatarUrl)
    if (updateRes.code === 0) {
      const myAccount = window.$state.global.account
      window.$dispatch({ type: 'updateUsers', payload: [{ account: myAccount, avatar: avatarUrl }] })
    }
  } else {
    message.error('上传头像失败', 1)
  }
}
export async function handForgot(params: Parameters<typeof forgot>[number]) {
  const rsaPwd = await getRsaEncrypt(params.password)
  return await forgot({ ...params, password: rsaPwd })
}
export async function handUpdateSign(sign: string) {
  const { code } = await updateSign(sign)
  if (code === 0) {
    const myAccount = window.$state.global.account
    window.$dispatch({ type: 'updateUsers', payload: [{ account: myAccount, sign }] })
  }
}
