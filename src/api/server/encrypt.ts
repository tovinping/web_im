import { get } from 'src/utils/fetch'

export function getPublicKey() {
  return get<string>('/encrypt/publicKey')
  
}