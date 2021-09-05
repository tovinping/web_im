const windowSize: { [K: string]: () => void } = {
  maxSize() {
    window.$dispatch({ type: 'updateGlobal', payload: { windowSize: 'maxSize' } })
  },
  minSize() {
    window.$dispatch({ type: 'updateGlobal', payload: { windowSize: 'minSize' } })
  },
  normalSize() {
    window.$dispatch({ type: 'updateGlobal', payload: { windowSize: 'normalSize' } })
  },
}
window.handleBroadcast = (channel: string, payload: any) => {
  console.log('receive broadcast:', channel, payload)
  windowSize[channel]?.()
}

export {}
