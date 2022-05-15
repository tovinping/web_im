import React, { useCallback } from 'react'
import { Modal } from 'antd'
import ContactSelect from 'src/components/ContactSelect'
import { useRootState } from 'src/store'
import { createP2pChat } from 'src/service/chat'
let selectedList: IUser[] = []
const logger = window.getLogger('createChat')
export default function CreateChat() {
  const creatChatVisible = useRootState(state => state.global.creatChatVisible)
  const handContactSelectChange = useCallback((list: IUser[]) => {
    selectedList = [...list]
  }, [])
  function reset() {
    window.$dispatch({ type: 'setCreateChatVisible', payload: false })
    selectedList = []
  }
  const handOk = useCallback(() => {
    logger.info('handOk', selectedList)
    if (selectedList.length === 1) {
      createP2pChat(selectedList[0])
    } else if (selectedList.length > 1) {
      logger.info('create group')
    }
    reset()
  }, [])
  return (
    <Modal visible={creatChatVisible} onCancel={reset} onOk={handOk} destroyOnClose={true}>
      <ContactSelect onChange={handContactSelectChange} />
    </Modal>
  )
}
