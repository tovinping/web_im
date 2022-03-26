import React from 'react'
import style from './index.module.scss';

export default function MsgItemText(props: IMsgType) {
  return <div className={style.msgText} dangerouslySetInnerHTML={{__html: props.content}}></div>
}
