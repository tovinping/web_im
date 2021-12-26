import { post } from '../utils/fetch'
import { ILoginReq, ILoginRes } from '../interface/login'
import { getRsaEncrypt } from 'src/utils/encrypt';
export async function login(data: ILoginReq) {
  const rsaPwd = await getRsaEncrypt(data.password);
  return post<ILoginRes>('/user/login', {...data, password: rsaPwd})
}
