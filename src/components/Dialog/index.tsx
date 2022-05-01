import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import style from './index.module.scss'
interface IProps {
  visible: boolean
  title?: string
}
export default function Dialog({ visible, children, title }: React.PropsWithChildren<IProps>) {
  const divRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (visible && divRef.current) {
      document.body.appendChild(divRef.current)
    } else if (!visible && divRef.current) {
      document.body.removeChild(divRef.current)
    }
  }, [visible])
  useEffect(() => {
    const divEl = document.createElement('div')
    divEl.className = 'dialog'
    divRef.current = divEl
  }, [])
  if (divRef.current) {
    return ReactDOM.createPortal(
      <div className={style.panel}>
        <div className={style.header}>
          <span className={style.title}>{title ?? null}</span>
          <span className={style.close}>close</span>
        </div>
        <div className={style.body}>{children}</div>
      </div>,
      divRef.current
    )
  } else {
    return null
  }
}
