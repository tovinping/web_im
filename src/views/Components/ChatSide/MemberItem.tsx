import React from 'react'
import classnames from 'classnames'
import { useRootState } from 'src/store'
import Avatar from '../Avatar'
import style from './MemberItem.module.scss'
import { IMemberInfo } from 'src/interface'
import Icon from 'src/components/Icon'
import ContextMenu from 'src/components/ContextMenu'
import { buildMemberMenu } from 'src/utils/contextMenu'
interface IProps {
  account: string
  type: IMemberInfo['type']
  groupId: string
  nickName?: string
  owner?: string
  classNames?: string
}
export default function MemberItem({ account, type, owner, groupId, nickName, classNames }: IProps) {
  const userInfo = useRootState(state => state.user[account])
  const showNickName = nickName ? `(${nickName})` : ''
  const memberName = userInfo?.chinesName || '' + showNickName
  const isOwner = owner === account
  const isManger = type === '1'
  const fillColor = isOwner ? '#ffc107' : '#2196f3'
  function handContextMenu(evt: React.MouseEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    const result = buildMemberMenu({ account, type, groupId, nickName })
    ContextMenu.open(result, { x: evt.clientX, y: evt.clientY })
  }
  return (
    <>
      <li className={classnames(style.memberItem, classNames)} onContextMenu={handContextMenu}>
        <Avatar id={account} type={'0'} size={'small'} />
        <div className={style.memberName} title={memberName}>
          {memberName}
        </div>
        {isManger || isOwner ? <Icon type={'Person'} fill={fillColor} /> : null}
      </li>
    </>
  )
}
