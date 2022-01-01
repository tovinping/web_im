import config from '../config'
import { IResBase } from '../interface'
import { getToken } from './storage'
function getCommonHeader() {
  const token = getToken()
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' }
}
interface IMyFetch {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  uri: string
  data?: Record<string, any>
  params?: Record<string, any>
}
async function myFetch<T>({ method, data, params, uri }: IMyFetch): Promise<IResBase<T>> {
  const headers = getCommonHeader()
  let url = config.baseUrl + uri
  if (params) {
    let query = '?'
    for (const key in params) {
      const value = params[key]
      query += `${key}=${value}&`
    }
    url += query
  }
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    return { code: 1, msg: '请求失败', body: null }
  }
}

export function get<T = any>(uri: string, params?: Record<string, any>) {
  return myFetch<T>({ method: 'GET', uri, params })
}
export function post<T = any>(uri: string, data?: Record<string, any>) {
  return myFetch<T>({ method: 'POST', uri, data })
}

export function put<T = any>(uri: string, data: Record<string, any>) {
  return myFetch<T>({ method: 'PUT', uri, data })
}
export function del<T = any>(uri: string, data: Record<string, any>) {
  return myFetch<T>({ method: 'DELETE', uri, data })
}