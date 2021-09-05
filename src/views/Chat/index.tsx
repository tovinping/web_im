import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'
import { Modal } from 'antd'
import { IUser } from 'src/interface'
import { useRootState } from 'src/store'
import ContactSelect from 'src/components/ContactSelect'
import Conversation from 'src/views/Components/Conversation'
import MsgList from '../Components/MsgList'
import Editor from '../Components/Editor'
import ChatInfo from '../Components/ChatInfo'
import ChatSide from '../Components/ChatSide'
const selectedList: IUser[] = []
const style = require('./index.module.scss')
export default function Chat() {
  const history = useHistory()
  const isLogin = useRootState(state => state.global.isLogin)
  const currentType = useRootState(state => state.conversation.current?.type)
  const { visible, selected } = useRootState(state => state.global.contactSelect)
  useEffect(() => {
    if (!isLogin) {
      history.replace('/')
    }
  }, [isLogin, history])
  const handContactSelectChange = useCallback((data: IUser) => {
    const index = selectedList.findIndex(item => item.account === data.account)
    if (index >= 0) {
      selectedList.splice(index, 1)
    } else {
      selectedList.push(data)
    }
  }, [])
  const handCancel = useCallback(() => {
    window.$dispatch({ type: 'updateContactSelect', payload: { visible: false } })
  }, [])
  const handOk = useCallback(() => {
    const cpCallback = window.$state.global.contactSelect.callback
    window.$dispatch({ type: 'updateContactSelect', payload: { visible: false } })
    cpCallback?.(selectedList)
  }, [])
  return (
    <div className={style.chatContainer}>
      <div className={style.chatLeft}>
        <Conversation />
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
      <Modal visible={visible} onCancel={handCancel} onOk={handOk} destroyOnClose={true}>
        <ContactSelect onChange={handContactSelectChange} selected={selected} />
      </Modal>
    </div>
  )
}
