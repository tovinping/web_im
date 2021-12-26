import { get } from '../utils/fetch'

export function getPublicKey() {
  return get<string>('/encrypt/publicKey', {})
  
}