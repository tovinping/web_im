import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'
import { Modal } from 'antd'
import { useRootState } from 'src/store'
import ContactSelect from 'src/components/ContactSelect'
import ChatList from 'src/views/Components/ChatList'
import MsgList from '../Components/MsgList'
import Editor from '../Components/Editor'
import ChatInfo from '../Components/ChatInfo'
import ChatSide from '../Components/ChatSide'
import { syncMyInfo } from 'src/utils'
const style = require('./index.module.scss')
let selectedList: IUserType[] = []
export default function ChatRoot() {
  const history = useHistory()
  const isLogin = useRootState(state => state.global.isLogin)
  const currentType = useRootState(state => state.chat.current?.type)
  const { visible, selected } = useRootState(state => state.global.contactSelect)
  useEffect(() => {
    if (!isLogin) {
      history.replace('/')
    } else {
      syncMyInfo();
    }
  }, [isLogin, history])
  const handContactSelectChange = useCallback((data: IUserType) => {
    const index = selectedList.findIndex(item => item.account === data.account)
    if (index >= 0) {
      selectedList.splice(index, 1)
    } else {
      selectedList.push(data)
    }
  }, [])
  function reset() {
    window.$dispatch({ type: 'updateContactSelect', payload: { visible: false } })
    selectedList = []
  }
  const handCancel = useCallback(() => {
    const cpCallback = window.$state.global.contactSelect.callback
    cpCallback?.([])
    reset()
  }, [])
  const handOk = useCallback(() => {
    const cpCallback = window.$state.global.contactSelect.callback
    cpCallback?.(selectedList)
    reset()
  }, [])
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
      <Modal visible={visible} onCancel={handCancel} onOk={handOk} destroyOnClose={true}>
        <ContactSelect onChange={handContactSelectChange} selected={selected} />
      </Modal>
    </div>
  )
}
