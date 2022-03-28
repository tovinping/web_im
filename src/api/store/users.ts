const storeUserApi = {
  addUsers(list: IUserType[]) {
    window.$dispatch({ type: 'addUsers', payload: list })
  },
}
export default storeUserApi
