interface IAddMsgs {
  chatId: string
  msgs: IMsg[]
}
export function addMsgs(payload: IAddMsgs) {
  window.$dispatch({ type: 'addMsgs', payload })
}
export function prePendMsgs(payload: IAddMsgs) {
  window.$dispatch({ type: 'prePendMsgs', payload })
}
