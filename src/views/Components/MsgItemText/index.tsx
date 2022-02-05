import React from 'react'
import { IMsg } from 'src/interface'
import style from './index.module.scss';

export default function MsgItemText(props: IMsg) {
  return <div className={style.msgText} dangerouslySetInnerHTML={{__html: props.content}}></div>
}
