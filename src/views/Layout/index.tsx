import React from 'react'
import AppMenu from 'src/views/Components/AppMenu'
import style from './index.module.scss'
export default function Layout(Com: () => JSX.Element) {
  return function LayoutWrap() {
    return (
      <div className={style.layout}>
        <div className={style.side}>
          <AppMenu />
        </div>
        <div className={style.body}>
          <Com />
        </div>
      </div>
    )
  }
}
