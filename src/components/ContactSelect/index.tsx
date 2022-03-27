import React, { useCallback, useMemo, useReducer, useState } from 'react'
import { Input } from 'antd'
// import { useRootState } from 'src/store'
import { searchUserByAccounts } from 'src/service/user'
import ContactList from 'src/components/ContactList'
import { IActions } from 'src/typings'
import style from './index.module.scss'
interface IProps {
  selected?: string[]
  maxNum?: number
  onChange?(data?: any): void
}
type ISelectedActions = IActions<{ add: IUserType; remove: IUserType }>
export default function SelectContact({ selected = [], maxNum = 1000, onChange }: IProps) {
  const [searchList, setSearchList] = useState<IUserType[]>([])
  const [selectedMap, dispatch] = useReducer(
    (state: Record<string, IUserType | undefined>, action: ISelectedActions) => {
      const { type, payload } = action
      switch (type) {
        case 'add': {
          return { ...state, [payload.account]: payload }
        }
        case 'remove': {
          return { ...state, [payload.account]: undefined }
        }
        default:
          return state
      }
    },
    {}
  )
  const selectedList = useMemo(() => {
    return Object.values(selectedMap).filter(Boolean) as IUserType[]
  }, [selectedMap])
  const onSearch = useCallback(async value => {
    const userList = await searchUserByAccounts([value])
    userList && setSearchList(userList)
  }, [])
  const addCallback = useCallback(
    payload => {
      const type = selectedMap[payload.account] ? 'remove' : 'add'
      dispatch({ type, payload })
    },
    [selectedMap]
  )
  const removeCallback = useCallback(payload => {
    dispatch({ type: 'remove', payload })
  }, [])
  return (
    <div className={style.contactSelect}>
      <div className={style.selectArea + ' scroll'}>
        <Input.Search placeholder="输入帐号和姓名进行搜索" type={'search'} onSearch={onSearch} />
        <div className={style.searchList}>
          {<ContactList list={searchList} activeMap={selectedMap} onChange={addCallback} />}
        </div>
      </div>
      <div className={style.selectedList}>
        <ContactList list={selectedList} activeMap={selectedMap} onChange={removeCallback} />
      </div>
    </div>
  )
}
