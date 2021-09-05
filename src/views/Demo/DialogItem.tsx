import React from 'react'

export default function DialogItem() {
  function btnClick() {
    console.log('btnClick...')
  }
  return (
    <div>
      <div>
        <input placeholder={'输入点什么东西吧'} />
      </div>
      <div>
        <button onClick={btnClick}>点我试一下</button>
      </div>
    </div>
  )
}
