import React from 'react'
import { Popover } from 'antd'
import { ChatAvatar } from 'src/components/Avatar'
import { CHAT_TYPE } from 'src/constant'
import Personal from 'src/components/Personal'
import Setting from 'src/components/Setting'
import style from './index.module.scss'
import { useRootState } from 'src/store'
export default function Layout(Com: () => JSX.Element) {
  return function LayoutWrap() {
    const myAccount = useRootState(state => state.global.account)
    return (
      <div className={style.layout}>
        <ul className={style.menu}>
          <Popover
            overlayClassName={style.popOver}
            content={<Personal isSelf={true} account={myAccount} />}
            trigger={'click'}
            placement="rightTop"
          >
            <li>
              <ChatAvatar type={CHAT_TYPE.P2P} chatId={myAccount} />
            </li>
          </Popover>
          <li>消息</li>
          <li>通讯录</li>
          <li>收藏</li>
          <li>我的</li>
          <Popover overlayClassName={style.popOver} content={<Setting />} trigger={'click'} placement="rightBottom">
            <li>设置</li>
          </Popover>
        </ul>
        <div className={style.body}>
          <Com />
        </div>
      </div>
    )
  }
}
