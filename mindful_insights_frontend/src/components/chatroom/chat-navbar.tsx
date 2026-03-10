import React from 'react'

const ChatNavbar = () => {
  return (
    <div className='chat-navbar'>
      <span className='chat-logo'> MESSAGING</span>
      <div className="chat-user">
        <img src={`${process.env.PUBLIC_URL}/assets/images/profile.png`} alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default ChatNavbar