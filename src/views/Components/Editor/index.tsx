import React, { useRef } from 'react'
import { Button, message } from 'antd'
import { SmileOutlined, FileOutlined, HistoryOutlined } from '@ant-design/icons'
import { useRootState } from 'src/store'
import PopContent from 'src/components/PopContent'
import Emoji from 'src/views/Components/Editor/Emoji'
import { getCurrentChatInfo } from 'src/helper/chat'
import { sendTextMsg } from 'src/service/msg'
import style from './index.module.scss'

export default function Editor() {
  const currentId = useRootState(state => state.chat.currentChatId)
  const editRef = useRef<HTMLDivElement>(null)
  function handSend() {
    const currentInfo = getCurrentChatInfo()
    if (!currentInfo) return
    const text = editRef.current?.innerHTML
    console.log('text==', text)
    if (!text?.trim()) {
      message.error('不能发送空消息呀')
      return
    }
    editRef.current!.innerHTML = ''
    sendTextMsg({
      chatId: currentId,
      chatType: currentInfo.type,
      content: text,
    })
    editRef.current?.focus()
  }
  function insertEmoji(emojiName: string) {
    const imgEl = document.createElement('img')
    imgEl.src = `emojis/${emojiName}`
    if (editRef.current) {
      editRef.current.appendChild(imgEl)
    }
  }
  if (!currentId) return null
  return (
    <div className={style.editorContainer}>
      <div className={style.editorExtends}>
        <PopContent placement="top" content={<Emoji insertEmoji={insertEmoji} />}>
          <SmileOutlined title={'表情'} className={style.extendItem} />
        </PopContent>
        <FileOutlined title={'文件'} className={style.extendItem} />
        <HistoryOutlined title={'历史记录'} className={style.extendItem} />
      </div>
      <div className={style.textArea} contentEditable ref={editRef}></div>
      <div className={style.send}>
        <Button type={'primary'} onClick={handSend}>
          发送
        </Button>
      </div>
    </div>
  )
}
