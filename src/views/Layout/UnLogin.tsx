import React from 'react'
import style from './unLogin.module.scss'
interface IProps {
  title: string
  content(): JSX.Element
}
export default function UnLoginLayout({ content: Content, title }: IProps) {
  return function LayoutWrap() {
    return (
      <div className={style.unLogin}>
        <h1 className={style.title}>{title}</h1>
        <div className={style.body}>
          <Content />
        </div>
      </div>
    )
  }
}
