import { useEffect, useCallback } from 'react'
type keyType = 'control.enter' | 'enter' | 'control'

export function useKeyPress(el: HTMLElement | null, fn?: (type: keyType) => void) {
  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (e.ctrlKey) {
          fn?.('control.enter')
        } else {
          fn?.('enter')
        }
      }
    },
    [fn]
  )
  const upHandler = (e: KeyboardEvent) => {}
  const eleOrBody = el || document.body
  useEffect(() => {
    eleOrBody.addEventListener('keydown', downHandler)
    eleOrBody.addEventListener('keyup', upHandler)
    return () => {
      eleOrBody.removeEventListener('keydown', downHandler)
      eleOrBody.removeEventListener('keyup', upHandler)
    }
  }, [downHandler, eleOrBody])
}
