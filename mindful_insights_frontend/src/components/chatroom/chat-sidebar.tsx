import React from 'react'
import ChatNavbar from './chat-navbar'
import ChatSearchbar from './chat-searchbar'
import Chats from './Chats'

export const ChatSidebar = () => {
  return (
    <div className='chat-sidebar'>
        <ChatNavbar/>
        <ChatSearchbar/>
        <Chats/>
    </div>
  )
}

export default ChatSidebar
