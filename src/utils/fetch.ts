import { message } from 'antd'
import { getUniqueFileName } from '.'
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
    const arr = Object.entries(params)
    url += '?' + arr.map(item => item.join('=')).join('&')
  }
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    })
    return response.json()
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

const Bucket = 'images-1251944858'
const Region = 'ap-guangzhou'
function getAuthorization(_: any, callback: any) {
  const myAccount = window.$state.global.account
  get(`/token/sts/${myAccount}`).then(result => {
    if (result.code === 0) {
      const body = result.body
      const credentials = body.credentials
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: body.startTime,
        ExpiredTime: body.expiredTime,
      })
    } else {
      message.error('请示失败', 1)
      return
    }
  })
}
// 初始化实例
const cos = new COS({
  getAuthorization: getAuthorization,
})
interface IUploadFile {
  file: File
  onProgress?(): void
  callback?(data: IResBase<string>): void
}
export function uploadCos({ file, onProgress, callback }: IUploadFile) {
  const Key = `${window.$state.global.account}/${getUniqueFileName(file)}`
  cos.putObject(
    {
      Bucket,
      Region,
      Key,
      Body: file,
      onProgress,
    },
    function(err: Error, data: {Location: string}) {
      if (err) {
        callback?.({code: 1, msg: err.toString(), body: null})
      } else {
        callback?.({code: 0, msg: '', body: `https://${data.Location}`})
      }
    }
  )
}
