import { getContactList } from 'src/api/server'

export async function searchUserByAccounts(accounts: string[]) {
  const { body } = await getContactList({ accounts: accounts })
  return body
}
