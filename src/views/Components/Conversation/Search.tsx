import React from 'react'
import { Input, Modal } from 'antd'
import ICon from 'src/components/Icon'
import style from './Search.module.scss'
import { openContactSelect, openOrCreateConversation, handCreateGroup } from 'src/utils'
let groupName = ''
export default function Search() {
  const handCreateConversation = () => {
    openContactSelect({
      callback: selectedList => {
        if (!selectedList || selectedList?.length === 0) return
        // 创建单聊
        if (selectedList.length === 1) {
          const conversationId = selectedList[0].account
          openOrCreateConversation(conversationId, '0')
        } else {
          // 创建群=>创建群会话
          const confirm = Modal.confirm({
            title: '请输入群名称',
            content: <Input placeholder={'请输入群名称'} onChange={e => (groupName = e.target.value)} />,
            onOk() {
              const memberList = selectedList.map(item => item.account)
              handCreateGroup(groupName, memberList).then(async res => {
                console.log('groupInfo=', res)
                if (res) {
                  window.$dispatch({ type: 'setGroup', payload: { [res.groupId]: res } })
                  await openOrCreateConversation(res.groupId, '1')
                }
                confirm.destroy()
              })
            },
          })
        }
      },
    })
  }
  return (
    <div className={style.search}>
      <Input placeholder={'搜索最近会话和联系人'} />
      <ICon type={'Plus'} className={style.plus} onClick={handCreateConversation} />
    </div>
  )
}
