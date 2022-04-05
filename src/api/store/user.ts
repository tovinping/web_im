export function addUsers(list: IUserType[]) {
  window.$dispatch({ type: 'addUsers', payload: list })
}
