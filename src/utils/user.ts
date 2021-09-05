import { getContactList } from 'src/api'
export async function queryContactList(pageNo = 1) {
  const result = await getContactList({ pageNo, pageSize: 20 })
  const oldUserMap = window.$state.user
  const userMap = { ...oldUserMap }
  if (result.code === 0) {
    result.data?.forEach(item => {
      userMap[item.account] = item
    })
    console.log('loadContactList', userMap)
    window.$dispatch({ type: 'setUser', payload: userMap })
  }
}
