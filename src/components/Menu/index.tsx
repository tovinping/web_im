import React, { useState } from 'react'
import classnames from 'classnames'
import style from './index.module.scss'
export interface IMenuItem {
  subMenu?: IMenuItem[]
  value: string
  key: string
  activeKey?: string
  cb?(key: IMenuItem): void
}
export interface IProps {
  onClick?(key: string): void
  menus: IMenuItem[]
}

function RenderSubList(items: IMenuItem[], activeKey?: string) {
  const [selectKey, setSelectKey] = useState(activeKey || '')
  if (!items.length) return null
  const handClick = (item: IMenuItem) => {
    item.cb && item.cb(item)
    setSelectKey(item.key)
  }
  return (
    <ul className={style.subList}>
      {items.map(s => (
        <li key={s.key} className={classnames(style.subItem, selectKey === s.key && style.active)} onClick={() => handClick(s)}>{s.value}</li>
      ))}
    </ul>
  )
}

function RenderItem(item: IMenuItem): JSX.Element {
  const [subItem, setSubItem] = useState<IMenuItem[]>([])
  const subMenuClick = () => {
    if (subItem.length) {
      setSubItem([])
    } else if (item.subMenu) {
      setSubItem(item.subMenu)
    }
  }
  if (item.subMenu) {
    return (
      <div className={classnames(style.subMenu, style.menuItem)} key={item.key} onClick={subMenuClick}>
        {item.value}
        {RenderSubList(subItem, item.activeKey)}
      </div>
    )
  } else {
    return (
      <li className={style.menuItem} key={item.key} onClick={() => item.cb && item.cb(item)}>
        {item.value}
      </li>
    )
  }
}
export default function Menu(props: IProps) {
  return <ul className={style.menuWrap}>{props.menus.map(RenderItem)}</ul>
}
