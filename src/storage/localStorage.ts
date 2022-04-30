import { storeApi } from 'src/api'

function getKey(key: keyof ILocalStorage) {
  const account = storeApi.getState().global.account
  return `${key}_${account}`
}
export function setLocalStorage<K extends keyof ILocalStorage, V extends ILocalStorage[K]>(key: K, value: V) {
  const userKey = getKey(key)
  return localStorage.setItem(userKey, value)
}
export function getLocalStorage<K extends keyof ILocalStorage>(key: K): ILocalStorage[K] | null {
  const userKey = getKey(key)
  return localStorage.getItem(userKey) as any
}
