import { useCallback, useEffect, useRef } from 'react'

export * from './contextMenu'
export * from './history'
export * from './file'
export * from './encrypt'
export * as storage from './storage'
export * from './dom'
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

export default function useDebounce<T>(fn: (data: T) => void, delay = 100, deps?: any[]) {
  const { current } = useRef<{ fn: Function; timer: NodeJS.Timeout | null }>({ fn, timer: null })
  useEffect(
    function () {
      current.fn = fn
    },
    [current, deps, fn]
  )

  return useCallback(
    (...args) => {
      if (current.timer) {
        clearTimeout(current.timer)
      }
      current.timer = setTimeout(() => {
        current.fn.call(current.fn, ...args)
      }, delay)
    },
    [current, delay]
  )
}
