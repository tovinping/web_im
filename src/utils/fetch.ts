import { message } from 'antd'
import config from '../config'
import { IResBase } from '../interface'
import { getToken } from './storage'
function getCommonHeader() {
  const token = getToken()
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' }
}
export async function get<T = any>(uri: string, payload?: Record<string, any>): Promise<IResBase<T>> {
  let query = '?'
  for (const key in payload) {
    const value = payload[key]
    query += `${key}=${value}&`
  }
  const headers = getCommonHeader()
  try {
    const response = await fetch(config.baseUrl + uri + query, { method: 'get', headers })
    return await response.json()
  } catch (error) {
    message.error('请求失败')
    return { code: 1, msg: '请求失败', data: null }
  }
}

export async function post<T = any>(uri: string, payload?: Record<string, any>): Promise<IResBase<T>> {
  const headers = getCommonHeader()
  try {
    const response = await fetch(config.baseUrl + uri, {
      method: 'post',
      headers,
      body: JSON.stringify(payload),
    })
    return await response.json()
  } catch (error) {
    message.error('请求失败')
    return { code: 1, msg: '请求失败', data: null }
  }
}
