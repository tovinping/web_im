import React, { useState } from 'react'
import { ChatAvatar } from 'src/components/Avatar'
import Dialog from 'src/components/Dialog'
import Setting from 'src/views/Components/Setting'
import { CHAT_TYPE } from 'src/constant'
import { useRootState } from 'src/store'
import style from './index.module.scss'

export default function AppMenu() {
  const myAccount = useRootState(state => state.global.account)
  const [visible, setVisible] = useState(false)
  return (
    <ul className={style.menu}>
      <li>
        <ChatAvatar type={CHAT_TYPE.P2P} chatId={myAccount} />
      </li>
      <li>消息</li>
      <li>通讯录</li>
      <li>收藏</li>
      <li>我的</li>
      <li onClick={() => setVisible(true)}>设置</li>
      <Dialog visible={visible} title={'设置'}>
        <Setting />
      </Dialog>
    </ul>
  )
}
