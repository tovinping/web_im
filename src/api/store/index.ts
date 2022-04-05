import store from 'src/store'
export * from './chat'
export * from './user'
export * from './msg'
export function getState() {
  return store.getState()
}
