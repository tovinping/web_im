import React from 'react'
import { IMsg } from 'src/interface'
export default function MsgItemText(props: IMsg) {
  return <div>{props.content}</div>
}
