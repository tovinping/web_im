import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import style from './index.module.scss';
export interface IProps {
  title: string;
  children?: React.Component;
  content: string;
}
export default function Message() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    });
  },[])
  return <div className={classnames(style.container, visible && style.show)}>成功</div>
}
export function success(props: IProps) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  setTimeout(() => {
    document.body.removeChild(container);
  }, 3000);
  ReactDOM.render(<Message />, container)
}