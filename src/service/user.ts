import { getContactList } from 'src/api/server'
import { storeApi, dbApi, serverApi } from 'src/api'
import { getState } from 'src/api/store'
export function addUsers(list: IUserType[]) {
  dbApi.addUsers(list)
  storeApi.addUsers(list)
}
export function removeUsers() {}
export function updateUsers() {}

export async function syncMyInfo() {
  const myAccount = window.$state.global.account
  const { body } = await serverApi.getUserInfo(myAccount)
  if (body) {
    window.$dispatch({ type: 'updateUsers', payload: [body] })
  }
}

export async function getUsers(accounts: string[]) {
  const findUsers: IUserType[] = []
  const accountsForDb: string[] = []
  const accountsForServer: string[] = []
  // store
  const userMap = getState().user.map
  accounts.forEach(acc => {
    const userInfo = userMap[acc]
    if (userInfo?.account) {
      findUsers.push(userInfo)
    } else {
      accountsForDb.push(acc)
    }
  })
  if (accountsForDb.length === 0) return findUsers
  // db
  const dbUsers = await dbApi.getUsers(accountsForDb)
  accountsForDb.forEach(acc => {
    const userInfo = dbUsers.find(user => user.account === acc)
    if (userInfo?.account) {
      findUsers.push(userInfo)
    } else {
      accountsForServer.push(acc)
    }
  })
  if (accountsForServer.length === 0) return findUsers
  // service
  const userListRes = await getContactList({ accounts: accountsForServer })
  return findUsers.concat(userListRes.body || [])
}

export async function searchUserByAccounts(accounts: string[]) {
  const { body } = await getContactList({ accounts: accounts })
  return body
}
export async function loadUserInfos(accounts: string[]) {
  const userList = await getUsers(accounts)
  addUsers(userList)
}
