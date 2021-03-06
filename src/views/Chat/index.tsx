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
        <ChatSide />
      </div>
      <CreateChat />
    </div>
  )
}
