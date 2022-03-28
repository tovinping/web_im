const storeChatApi = {
  addChats(list: IChatType[]) {
    window.$dispatch({ type: 'addChats', payload: list })
  },
}
export default storeChatApi
