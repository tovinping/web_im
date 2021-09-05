import React from 'react'
import defaultAvatar from 'src/resource/images/avatar1.jpg'
import style from './ContactAvatar.module.scss'
export type ISize = 'small' | 'normal' | 'large'
interface IProps {
  size?: ISize
}
export default function ContactAvatar({size ='normal'}: IProps) {
  return <div className={style.contactAvatar}>
    <img className={style[size]} src={defaultAvatar} alt="" />
  </div>
}
