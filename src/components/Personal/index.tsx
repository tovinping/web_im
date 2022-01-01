import React, { useState, useRef } from 'react'
import { BaseAvatar } from 'src/components/Avatar'
import { updateSign } from 'src/api/user'
import style from './index.module.scss'
import { useRootState } from 'src/store'
import Icon from '../Icon'
let inputValue = ''
interface IProps {
  account: string
  isSelf?: boolean
}
export default function Personal({ account, isSelf }: IProps) {
  const userInfo = useRootState(state => state.user[account])
  const signRef = useRef<HTMLInputElement>(null)
  const [signEditor, setSignEditor] = useState(false)
  const signClick = () => {
    if (!isSelf) return
    setSignEditor(true)
    setTimeout(() => {
      signRef.current?.focus()
    }, 1)
  }
  const signChange: React.ChangeEventHandler<HTMLInputElement> = evt => {
    inputValue = evt.target.value
  }
  const signBlur = () => {
    setSignEditor(false)
    if (inputValue !== userInfo?.sign) {
      updateSign(inputValue)
    }
  }
  return (
    <div className={style.personal}>
      <div className={style.baseInfo}>
        <ul>
          <li>{userInfo?.name}</li>
          <li>帐号: {userInfo?.account}</li>
          <li>邮箱: {userInfo?.mail}</li>
        </ul>
        <BaseAvatar size={'large'} />
      </div>
      <ul className={style.extends}>
        {isSelf ? null : (
          <li>
            <span>备注: </span>
            {userInfo?.name}
          </li>
        )}
        <li>
          <span>签名: </span>
          {signEditor ? (
            <input
              className={style.signInput}
              type="text"
              ref={signRef}
              defaultValue={userInfo?.sign}
              onChange={signChange}
              onBlur={signBlur}
            />
          ) : (
            <p onClick={signClick}>{inputValue || userInfo?.sign}</p>
          )}
        </li>
        <li className={style.send}>
          <Icon width={20} height={20} type={'Share'} />
          <Icon width={20} height={20} type={'Send'} />
        </li>
      </ul>
    </div>
  )
}
