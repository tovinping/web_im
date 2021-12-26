function getItem(key: string) {
  return localStorage.getItem(key)
}
function setItem(key: string, data: any) {
  return localStorage.setItem(key, data)
}
let token = ''
export function setToken(data: string) {
  token = data;
  return setItem('token', data)
}
export function getToken() {
  if (token) return token
  return getItem('token')
}
export function setRefreshToken(data: string) {
  return setItem('refreshToken', data)
}
export function getRefreshToken() {
  return getItem('refreshToken')
}