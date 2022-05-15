export function addMsgs(list: IMsg[]) {
  console.log('addMsgs', list.length)
}
export function removeMsgs(msgIds: IMsg['msgId']) {
  console.log('removeMsgs', msgIds)
}
export function updateMsgs(list: IMsg) {
  console.log('updateMsgs', list)
}
export function getMsgs(msgIds: IMsg['msgId']) {
  console.log('getMsgs', msgIds)
}
