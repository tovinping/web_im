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
  const [visible, setVisible] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const clickCb = useCallback(
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = divRef.current?.getBoundingClientRect()
      if (!rect) return
      getPlacement(props, rect)
      setVisible(true)
    },
    [props]
  )
  useEffect(() => {
    if (visible) {
      const divEl = document.createElement('div')
      divEl.id = 'tovinping'
      divEl.style.bottom = style.bottom
      divEl.style.left = style.left
      divEl.style.position = 'absolute'
      ReactDOM.render(props.content, divEl)
      document.body.appendChild(divEl)
    }
  }, [props.content, visible])
  const onWheel: React.WheelEventHandler<HTMLDivElement> = evt => {
    console.log('aaa', evt.deltaY)
  }
  return (
    <div ref={divRef} onClick={clickCb} onWheel={onWheel}>
      {props.children}
    </div>
  )
}
