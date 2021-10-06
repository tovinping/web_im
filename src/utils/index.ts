export * from './global'
export * from './chat'
export * from './user'
export * from './group'
export * from './member'
export * from './contextMenu'
export function getRandomStr() {
  return Math.random().toString(32).slice(2)
}