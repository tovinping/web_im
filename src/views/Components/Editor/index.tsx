import React, {useRef} from 'react'
import {Button,message} from 'antd'
import {SmileOutlined, FileOutlined, HistoryOutlined } from '@ant-design/icons'
import {useRootState} from 'src/store'
import PopContent from 'src/components/PopContent';
import {sendTextMsg} from 'src/utils/message'
import style from './index.module.scss'

export default function Editor() {
  const current = useRootState(state => state.chat.current)
  const editRef = useRef<HTMLDivElement>(null)
  function handSend() {
    if (!current) return;
    const text = editRef.current?.innerText
    if (!text?.trim()) {
      message.error('不能发送空消息呀')
      return
    }
    editRef.current!.innerHTML = ''
    sendTextMsg({
      chatId: current.chatId,
      chatType: current.type,
      content: text
    })
  }
  if (!current?.chatId) return null
  return (
    <div className={style.editorContainer}>
      <div className={style.editorExtends}>
        <PopContent placement='top' content={<div>AAAA</div>}>
          <SmileOutlined title={'表情'} className={style.extendItem}/>
        </PopContent>
        <FileOutlined title={'文件'} className={style.extendItem}/>
        <HistoryOutlined title={'历史记录'} className={style.extendItem}/>
      </div>
      <div className={style.textArea} contentEditable ref={editRef}>
      </div>
      <div className={style.send}>
        <Button type={'primary'} onClick={handSend}>发送</Button>
      </div>
    </div>
  )
}
