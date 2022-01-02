import React, {useCallback, useState} from 'react'
import Icon from 'src/components/Icon'
import style from './BaseAvatar.module.scss'
export type ISize = 'small' | 'normal' | 'large'
interface IProps {
  size?: ISize
  url?: string;
}
export default function BaseAvatar({size ='normal', url}: IProps) {
  const [loadError, setLoadError] = useState(false)
  const handError = useCallback(() => {
    setLoadError(true)
  }, [])
  if (!url || loadError) return <Icon type={'Person'} fill='#999' width={40} height={40}/>
  return <div className={style.contactAvatar}>
    <img className={style[size]} src={url} alt="" onError={handError} />
  </div>
}
