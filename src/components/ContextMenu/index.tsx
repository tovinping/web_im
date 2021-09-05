import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { checkBoundary } from 'src/utils'
import style from './index.module.scss'
export interface IBaseContextItem<T = unknown> {
  key: string
  name: string
  ext?: T
  cb(): void
}
export interface IContextMenuProps {
  position: { x: number; y: number }
  list: IBaseContextItem[]
  close(): void
}
let oldEl: any = null
export function ContextMenu({ list, position, close }: IContextMenuProps) {
  const listRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    if (listRef.current) {
      const result = checkBoundary({ current: listRef.current, x: position.x, y: position.y })
      if (result.x) {
        listRef.current.style.right = result.value
        listRef.current.style.left = 'unset'
        listRef.current.style.top = position.y + 'px'
      } else if (result.y) {
        listRef.current.style.bottom = result.value
        listRef.current.style.top = 'unset'
        listRef.current.style.left = position.x + 'px'
      } else {
        listRef.current.style.top = position.y + 'px'
        listRef.current.style.left = position.x + 'px'
      }
    }
  }, [position])
  if (!list.length) return null
  const handClick = (item: IBaseContextItem) => {
    item.cb()
    close()
  }
  return (
    <ul ref={listRef} className={style.contextMenu} style={{ top: `-9999px`, left: `-9999px` }} onContextMenu={e => e.preventDefault()}>
      {list.map(item => (
        <li key={item.key} className={style.item} onClick={() => handClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}
function close() {
  if (oldEl) {
    document.body.removeChild(oldEl)
    oldEl = null
  }
  document.body.removeEventListener('click', close)
}
const operator = {
  open(list: IContextMenuProps['list'], position: IContextMenuProps['position']) {
    close()
    const divEl = document.createElement('div')
    oldEl = divEl
    document.body.appendChild(divEl)
    document.body.addEventListener('click', close)
    ReactDOM.render(<ContextMenu list={list} position={position} close={close} />, divEl)
  },
}
export default operator
