import JSEncrypt from 'jsencrypt'
import { getPublicKey } from 'src/api/encrypt'
let publicKey = ''
function rsaEncrypt(publicKey: string, data: string) {
  const encrypt = new JSEncrypt()
  encrypt.setKey(publicKey)
  return encrypt.encrypt(data) || ''
}
export async function getRsaEncrypt(data: string) {
  if (!publicKey) {
    const { body } = await getPublicKey()
    if (!body) {
      return ''
    }
    publicKey = body
    return rsaEncrypt(publicKey, data)
  } else {
    return rsaEncrypt(publicKey, data)
  }
}
