import { getContactList } from 'src/api/server'
import dbUserApi from 'src/api/db/user'
import storeUserApi from 'src/api/store/users'

export function addUsers(list: IUserType[]) {
  dbUserApi.addUsers(list)
  storeUserApi.addUsers(list)
}
export function removeUsers() {}
export function updateUsers() {}

export async function searchUserByAccounts(accounts: string[]) {
  const { body } = await getContactList({ accounts: accounts })
  return body
}
