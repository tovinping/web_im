import React from 'react'
import Icon from 'src/components/Icon'
import { useRootState } from 'src/store'
import style from './index.module.scss'
export default function TopBar() {
  const { windowSize } = useRootState(state => state.global)
  const handleChangeWindowSize = () => {
    console.log('windowSize', windowSize)
    if (windowSize === 'maxSize') {
      window.NodeBridge.normalSize()
    } else {
      window.NodeBridge.maxSize()
    }
  }
  return (
    <div className={style.topBar}>
      <div className={style.content}>
        <span className={style.title}>IM</span>
        <div className={style.options}>
          <div onClick={() => window.NodeBridge.miniSize()}>
            <Icon type={'MinSize'} width={12} height={12} />
          </div>
          <div onClick={handleChangeWindowSize}>
            {windowSize === 'maxSize' ? <Icon type={'NormalSize'} width={12} height={12} /> : <Icon type={'MaxSize'} width={12} height={12} />}
          </div>
          <div onClick={() => window.NodeBridge.closeWindow()}>
            <Icon type={'Close'} width={12} height={12} />
          </div>
        </div>
      </div>
    </div>
  )
}
