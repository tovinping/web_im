import { getContactList } from 'src/api/server'
import { storeApi, dbApi } from 'src/api'
export function addUsers(list: IUserType[]) {
  dbApi.addUsers(list)
  storeApi.addUsers(list)
}
export function removeUsers() {}
export function updateUsers() {}

export async function searchUserByAccounts(accounts: string[]) {
  const { body } = await getContactList({ accounts: accounts })
  return body
}
