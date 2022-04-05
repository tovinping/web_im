import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useRootState } from 'src/store'
import ChatList from 'src/views/Components/ChatList'
import MsgList from '../Components/MsgList'
import Editor from '../Components/Editor'
import ChatInfo from '../Components/ChatInfo'
import ChatSide from '../Components/ChatSide'
import CreateChat from 'src/views/Dialog/CreateChat'
import { syncMyInfo } from 'src/service'
import 'src/test'
const style = require('./index.module.scss')
export default function ChatRoot() {
  const history = useHistory()
  const isLogin = useRootState(state => state.global.isLogin)
  const currentId = useRootState(state => state.chat.currentChatId)
  const currentType = useRootState(state => state.chat.map[currentId]?.type)
  useEffect(() => {
    if (!isLogin) {
      history.replace('/')
    } else {
      syncMyInfo()
    }
  }, [isLogin, history])
  return (
    <div className={style.chatContainer}>
      <div className={style.chatLeft}>
        <ChatList />
      </div>
      <div className={style.chatRight}>
        <div className={style.chatMain}>
          <ChatInfo />
          <MsgList />
          <Editor />
        </div>
        {currentType === '1' ? (
          <div className={style.extends}>
            <ChatSide />
          </div>
        ) : null}
      </div>
      <CreateChat />
    </div>
  )
}
