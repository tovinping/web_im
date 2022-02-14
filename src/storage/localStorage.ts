const SEND_KEY = 'SEND_KEY'
export function getSendKey() {
  return localStorage.getItem(SEND_KEY) || 'en'
}
export function setSendKey(value: string) {
  return localStorage.setItem(SEND_KEY, value)
}