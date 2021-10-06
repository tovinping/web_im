import React, {useRef, useCallback} from 'react'
import defaultAvatar from 'src/resource/images/avatar1.jpg'
import style from './BaseAvatar.module.scss'
export type ISize = 'small' | 'normal' | 'large'
interface IProps {
  size?: ISize
  url?: string;
}
export default function BaseAvatar({size ='normal', url}: IProps) {
  const imgUrl = url || defaultAvatar
  const imgRef = useRef<HTMLImageElement>(null)
  const handError = useCallback(() => {
    imgRef.current && (imgRef.current.src = defaultAvatar)
  }, [])
  return <div className={style.contactAvatar}>
    <img className={style[size]} src={imgUrl} alt="" onError={handError} />
  </div>
}
