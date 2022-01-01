import React from 'react'
import { Popover } from 'antd'
import { ChatAvatar } from 'src/components/Avatar'
import { CHAT_TYPE } from 'src/constant'
import Personal from 'src/components/Personal'
import Setting from 'src/components/Setting'
import style from './index.module.scss'
export default function Layout(Com: () => JSX.Element) {
  return function () {
    return (
      <div className={style.layout}>
        <ul className={style.menu}>
          <li>
            <Popover
              overlayClassName={style.popOver}
              content={<Personal isSelf={true} account={window.$state.global.account} />}
              trigger={'click'}
              placement="rightTop"
            >
              <div>
                <ChatAvatar type={CHAT_TYPE.p2p} chatId="123" />
              </div>
            </Popover>
          </li>
          <li>消息</li>
          <li>通讯录</li>
          <li>收藏</li>
          <li>我的</li>
          <li>
            <Popover
              overlayClassName={style.popOver}
              content={<Setting />}
              trigger={'click'}
              placement="rightTop"
            >
              <span>设置</span>
            </Popover>
          </li>
        </ul>
        <div>
          <Com />
        </div>
      </div>
    )
  }
}
