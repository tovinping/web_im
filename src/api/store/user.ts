export function addUsers(list: IUser[]) {
  window.$dispatch({ type: 'addUsers', payload: list })
}
