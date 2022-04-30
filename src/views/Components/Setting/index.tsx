import React, { useState } from 'react'
import AppSetting from './AppSetting'
import MsgSetting from './MsgSetting'
import UserSetting from './UserSetting'
export default function Setting() {
  const [active, setActive] = useState<'user' | 'app' | 'msg'>('user')
  return (
    <div>
      <ul>
        <li onClick={() => setActive('user')}>个人设置</li>
        <li onClick={() => setActive('app')}>本地设置</li>
        <li onClick={() => setActive('msg')}>消息设置</li>
      </ul>
      <div>{active === 'app' ? <AppSetting /> : active === 'user' ? <UserSetting /> : <MsgSetting />}</div>
    </div>
  )
}
