import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import { useRootState } from 'src/store'
import style from './index.module.scss'
interface IProps {
  selected?: string[]
  maxNum?: number
  onChange?(data?: any): void
}
export default function SelectContact({ selected = [], maxNum = 1000, onChange }: IProps) {
  const userMap = useRootState(state => state.user)
  const myAccount = useRootState(state => state.global.account)
  const disabledList = [myAccount].concat(selected)
  const contactList = useMemo(() => {
    const list = []
    for (const key in userMap) {
      const contactInfo = userMap[key]
      if (contactInfo) {
        list.push(contactInfo)
      }
    }
    return list
  }, [userMap])
  return (
    <ul className={style.contactSelect + ' scroll'}>
      {contactList.map(item => (
        <li key={item.account}>
          <Checkbox disabled={disabledList.includes(item.account)} defaultChecked={disabledList.includes(item.account)} onChange={() => onChange?.(item)}>
            {item.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  )
}
