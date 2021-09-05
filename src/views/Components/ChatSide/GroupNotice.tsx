import React, {useState} from 'react'
import { Empty, Modal } from 'antd'
import { RightOutlined } from '@ant-design/icons';
import { useRootState } from 'src/store'
import style from './GroupNotice.module.scss'
import { updateNotice } from 'src/api';
interface IProps {
  groupId: string
}
let inputStr = ''
export default function GroupNotice({ groupId }: IProps) {
  const [visible, setVisible] = useState(false)
  const notice = useRootState(state => state.group[groupId]?.notice)
  const doChangeNotice = () => {
    console.log('doChangeNotice', inputStr)
    updateNotice(groupId, inputStr).then(r => {
      console.log('updateNotice', r)
      window.$dispatch({type: 'updateGroup', payload: {groupId, notice: inputStr}})
      setVisible(false)
    })
  }
  return (
    <div className={style.groupNotice}>
      <h2 onClick={() => setVisible(true)}>群公告 <RightOutlined style={{color: '#999'}} /></h2>
      {notice ? <div className={style.content}>{notice}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无公告'} style={{margin: '15px 0'}} />}
      <Modal visible={visible} title="编辑群公告" onOk={doChangeNotice} onCancel={() => setVisible(false)}>
        <textarea className={style.input} defaultValue={notice} onChange={(e) => (inputStr = e.target.value)}></textarea>
      </Modal>
    </div>
  )
}
