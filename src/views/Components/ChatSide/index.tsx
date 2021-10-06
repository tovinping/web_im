import React, { useEffect } from 'react'
import { useRootState } from 'src/store'
import GroupNotice from './GroupNotice'
import MemberList from './MemberList'
import MemberSearch from './MemberSearch'
import { handGetMemberList } from 'src/utils'
import style from './index.module.scss'
export default function ChatSide() {
  const currentId = useRootState(state => state.chat.current?.chatId)
  const currentType = useRootState(state => state.chat.current?.type)
  useEffect(() => {
    if (currentType === '1' && currentId) {
      handGetMemberList(currentId)
    }
  }, [currentId, currentType])
  if (!currentId || currentType !== '1') return null
  return (
    <div className={style.chatSide}>
      <ul>
        <li className={style.sideNotice}>
          <GroupNotice groupId={currentId} />
        </li>
        <li className={style.sideMember}>
          <MemberSearch className={style.sideMemberSearch} />
          <MemberList itemStyle={style.memberItemStyle} />
        </li>
      </ul>
    </div>
  )
}
