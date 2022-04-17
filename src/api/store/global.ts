export function updateMsgScrollBottom() {
  window.$dispatch({ type: 'updateMsgScrollBottom', payload: 1 })
}
export function updateMsgSendShortcutKey(payload: 'control.enter' | 'enter') {
  window.$dispatch({ type: 'updateSendMsgShortcutKey', payload })
}
