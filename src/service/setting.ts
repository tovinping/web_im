import { getLocalStorage, setLocalStorage } from 'src/storage/localStorage'

export function setSendType(value: ILocalStorage['sendType']) {
  return setLocalStorage('sendType', value)
}
export function getSendType(): ILocalStorage['sendType'] {
  return getLocalStorage('sendType') ?? '0'
}
