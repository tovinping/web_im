import React from 'react'
import { Input } from 'antd'
import ICon from 'src/components/Icon'
import style from './Search.module.scss'
import { openContactSelect } from 'src/utils'
// let groupName = ''
export default function Search() {
  const handCreateChat = () => {
    openContactSelect({selected: []})
    // openContactSelect({
    //   callback: selectedList => {
    //     if (!selectedList || selectedList?.length === 0) return
    //     // 创建单聊
    //     if (selectedList.length === 1) {
    //       const chatId = selectedList[0].account
    //       openOrCreateChat(chatId, CHAT_TYPE.p2p)
    //     } else {
    //       // 创建群=>创建群会话
    //       const confirm = Modal.confirm({
    //         title: '请输入群名称',
    //         content: <Input placeholder={'请输入群名称'} onChange={e => (groupName = e.target.value)} />,
    //         onOk() {
    //           const memberList = selectedList.map(item => item.account)
    //           handCreateGroup(groupName, memberList).then(async res => {
    //             console.log('groupInfo=', res)
    //             if (res) {
    //               window.$dispatch({ type: 'setGroup', payload: { [res.groupId]: res } })
    //               await openOrCreateChat(res.groupId, CHAT_TYPE.p2p)
    //             }
    //             confirm.destroy()
    //           })
    //         },
    //       })
    //     }
    //   },
    // })
  }
  return (
    <div className={style.search}>
      <Input placeholder={'搜索最近会话和联系人'} />
      <ICon type={'Plus'} className={style.plus} onClick={handCreateChat} />
    </div>
  )
}
