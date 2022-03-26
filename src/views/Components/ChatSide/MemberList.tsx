import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import style from './MemberList.module.scss'
import MemberItem from './MemberItem'
interface IProps {
  listStyle?: string
  itemStyle?: string
}
export default function MemberList({ listStyle, itemStyle }: IProps) {
  const currentId = useRootState(state => state.chat.currentChatId)
  const owner = useRootState(state => state.group.map[currentId]?.owner)
  const memberList = useRootState(state => state.member.map[currentId])
  if (!memberList?.length) return null
  return (
    <ul className={classnames(style.memberList, listStyle)}>
      {memberList.map(item => (
        <MemberItem key={item.account} account={item.account} owner={owner} type={item.type} groupId={currentId!} classNames={itemStyle} />
      ))}
    </ul>
  )
}
