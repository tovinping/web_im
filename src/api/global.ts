import { get } from '../utils/fetch'

export function getServerTime() {
  return get('/api/serverTime', {})
}