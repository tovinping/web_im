import React from 'react'
// import Dialog from './Dialog'
// import DialogItem from './DialogItem'
import {success} from 'src/components/Message'
import './index.css'

function App() {
  function handleClick() {
    success({title: 'TTT', content: 'bbb'})
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Test</button>
    </div>
  )
}

export default App
