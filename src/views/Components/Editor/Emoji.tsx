import React from 'react'
import { EMOJI_LIST } from 'src/constant'
import style from './emoji.module.scss'
export default function Emoji() {
  return (
    <div className={style.emojiWrap}>
      {EMOJI_LIST.map(item => (
        <img key={item.name} src={`emojis/${item.name}`} alt={item.des} title={item.des} />
      ))}
    </div>
  )
}
