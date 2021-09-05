import React from 'react'
import classnames from 'classnames'
import {Input} from 'antd'
interface IProps {
  className?: string
}
export default function MemberSearch({className}: IProps) {
  return <div className={classnames(className)}>
    <Input placeholder={'搜索群成员'} />
  </div>
}