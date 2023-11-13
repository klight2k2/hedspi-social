import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat/Chat'

const Messenger = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Messenger