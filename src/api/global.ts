import { get } from '../utils/fetch'

export function getServerTime() {
  return get('/api/serverTime')
}

export function getLoginCaptcha(account: string) {
  return get<string>(`/token/captcha/${account}`)
}