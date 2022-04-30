import React from 'react'
import Menu, { IMenuItem } from 'src/components/Menu'
import { getSendType } from 'src/service/setting'
import { logout, updateSendMsgShortcutKey } from 'src/service'
interface IProps {
  close(): void
}
export default function Setting({ close }: IProps) {
  const handSetSendKey = (item: IMenuItem) => {
    if (item.key === 'en') {
      updateSendMsgShortcutKey('enter')
    } else {
      updateSendMsgShortcutKey('control.enter')
    }
    close?.()
  }
  const sendActiveKey = getSendType()
  const menus: IMenuItem[] = [
    { key: '1', value: '意见反馈' },
    {
      key: 'key',
      value: '发送消息',
      activeKey: sendActiveKey,
      subMenu: [
        { key: '0', value: 'Enter', cb: handSetSendKey },
        { key: '1', value: 'Ctrl+Enter', cb: handSetSendKey },
      ],
    },
    {
      key: 'logout',
      value: '退出登录',
      cb: logout,
    },
  ]
  return <Menu menus={menus} />
}
