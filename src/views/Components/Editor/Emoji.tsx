import React from 'react'
import { EMOJI_LIST } from 'src/constant'
import style from './emoji.module.scss'
export default function Emoji() {
  const onclick: React.MouseEventHandler = (evt) => {
    evt.nativeEvent.stopPropagation();
    evt.nativeEvent.preventDefault();
    console.log('TANG===', evt.target);
  }
  return (
    <div className={style.emojiWrap}>
      {EMOJI_LIST.map(item => (
        <img key={item.name} src={`emojis/${item.name}`} alt={item.des} title={item.des} onClick={onclick} />
      ))}
    </div>
  )
}
