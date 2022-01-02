import React from 'react'
import style from './unLogin.module.scss'
export default function UnLoginLayout(Com: () => JSX.Element) {
  return function LayoutWrap() {
    return (
      <div className={style.unLogin}>
        <Com />
      </div>
    )
  }
}
