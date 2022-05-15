import React from 'react'
import { Checkbox } from 'antd'
import { BaseAvatar } from 'src/components/Avatar'
import style from './index.module.scss'

interface IProps {
  list: IUser[]
  activeMap: Record<string, IUser | undefined>
  onChange?(data: IUser): void
}
export default function ContactList({ list, activeMap, onChange }: IProps) {
  return (
    <ul className={style.contactList}>
      {list.map(item => (
        <li key={item.account} className={style.contactItem}>
          <div className={style.baseInfo}>
            <BaseAvatar url={item.avatar} />
            <span>{item.name}</span>
          </div>
          <div className={style.checkWrap}>
            <Checkbox checked={!!activeMap[item.account]} onChange={() => onChange?.(item)} />
          </div>
        </li>
      ))}
    </ul>
  )
}
