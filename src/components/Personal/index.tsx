import React, { useState, useRef } from 'react'
import { BaseAvatar } from 'src/components/Avatar'
import {updateSign} from 'src/api/user'

import style from './index.module.scss'
import { useRootState } from 'src/store'
let inputValue = ''
export default function Personal() {
  const myInfo = useRootState(state => state.global.myInfo)
  const signRef = useRef<HTMLInputElement>(null)
  const [signEditor, setSignEditor] = useState(false)
  const signClick = () => {
    setSignEditor(true)
    setTimeout(() => {
      signRef.current?.focus()
    }, 1);
  }
  const signChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    inputValue = evt.target.value
  }
  const signBlur = () => {
    setSignEditor(false)
    if (inputValue !== myInfo?.sign) {
      updateSign(inputValue)
    }
  }
  return (
    <div className={style.personal}>
      <div className={style.baseInfo}>
        <ul>
          <li>测试一</li>
          <li>帐号: test1</li>
          <li>邮箱: tovinping@qq.com</li>
        </ul>
        <BaseAvatar size={'large'} />
      </div>
      <ul className={style.extends}>
        <li>
          <span>备注: </span>开发者大大
        </li>
        <li>
          <span>签名: </span>
          {signEditor ? (
            <input type="text" ref={signRef} defaultValue={myInfo?.sign} onChange={signChange} onBlur={signBlur} />
          ) : (
            <p onClick={signClick}>{inputValue || myInfo?.sign}</p>
          )}
        </li>
        <li>发送名片 发送消息</li>
      </ul>
    </div>
  )
}
