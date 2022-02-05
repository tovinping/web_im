import React from 'react'
import { EMOJI_LIST } from 'src/constant'
import style from './emoji.module.scss'
interface IProps {
  insertEmoji?(emojiName: string):void
}
export default function Emoji(props:IProps) {
  const onclick: React.MouseEventHandler<HTMLImageElement> = (evt) => {
    evt.nativeEvent.stopPropagation();
    evt.nativeEvent.preventDefault();
    const src = evt.currentTarget.src
    const emojiName = src.split('emojis/')[1]
    props.insertEmoji?.(emojiName)
  }
  return (
    <div className={style.emojiWrap}>
      {EMOJI_LIST.map(item => (
        <img key={item.name} src={`emojis/${item.name}`} alt={item.des} title={item.des} onClick={onclick} />
      ))}
    </div>
  )
}
