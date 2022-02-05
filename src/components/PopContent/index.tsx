import React, { useEffect, useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

interface IProps {
  content: JSX.Element
  placement?: 'top' | 'left' | 'right' | 'bottom'
  align?: 'top' | 'left' | 'right' | 'bottom' | 'center'
}
let style: any = {}
function getPlacement(data: IProps, rect: DOMRect) {
  if (data.placement === 'top') {
    const bottom = document.body.clientHeight - rect.top + 'px'
    style = { left: rect.left  + 'px', bottom }
  }
}

export default function PopContent(props: React.PropsWithChildren<IProps>) {
  const divEl = document.createElement('div')
  const [visible, setVisible] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(divEl)
  const onClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = wrapRef.current?.getBoundingClientRect()
      if (!rect) return
      getPlacement(props, rect)
      setVisible(true)
    },
    [props]
  )
  const handClose = useCallback(() => {
    if (divRef.current && visible) {
      document.body.removeEventListener('click', handClose)
      document.body.removeChild(divRef.current)
      setVisible(false)
    }
  }, [visible])

  useEffect(() => {
    if (visible) {
      divRef.current.style.bottom = style.bottom
      divRef.current.style.left = style.left
      divRef.current.style.position = 'absolute'
      ReactDOM.render(props.content, divRef.current)
      document.body.appendChild(divRef.current)
      document.body.addEventListener('click', handClose)
    }
  }, [props.content, visible, handClose])
  
  return (
    <div ref={wrapRef} onClick={onClick}>
      {props.children}
    </div>
  )
}
