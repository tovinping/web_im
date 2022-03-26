import { get } from 'src/utils/fetch'

export function getServerTime() {
  return get('/api/serverTime')
}

export function getLoginCaptcha() {
  return get<{svg: string; id: string}>('/token/imgCaptcha')
}