export * from './global'
export * from './user'
export * from './group'
export * from './member'
export * from './contextMenu'
export * from './history'
export * from './file'
export function getRandomStr() {
  return Math.random().toString(32).slice(2)
}
export function sleep(timer: number, data?: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data || true)
    }, timer)
  })
}
export function isEmpty(val?: any) {
  return !(val
    ? typeof val === 'object'
      ? Array.isArray(val)
        ? !!val.length
        : !!Object.keys(val).length
      : true
    : false)
}
