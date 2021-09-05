import React, { useEffect, useCallback, useState } from 'react'
interface IProps {
  content: React.ReactNode
}
export default function Dialog(props: IProps) {
  const [visible, setVisible] = useState(true)
  const bodyClick = useCallback(() => {
    console.log('bodyClick*****************')
    setVisible(false)
  }, [])
  useEffect(() => {
    document.body.addEventListener('click', bodyClick)
    return () => {
      document.removeEventListener('click', bodyClick)
    }
  }, [bodyClick])
  function handleClick(e: React.MouseEvent) {
    e.nativeEvent.stopImmediatePropagation()
  }
  return (
    <div>
      {visible ? <div onClick={handleClick}>{props.content}</div> : null}
    </div>
  )
}
