import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import ChatMessages from './chat-messages';
import Input from './input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <div className="userChat">
          <img src={`${process.env.PUBLIC_URL}/assets/images/image2.png`} alt="" />
          <div className="userChatInfo">
            <span>Jane</span>
            <p>Hello???</p>
          </div>
        </div>
        <div className="chatIcons">
          <IconButton>
            <CallIcon/>
          </IconButton>
          <IconButton>
            <VideocamIcon/>
          </IconButton>
          <IconButton>
            <MoreHorizIcon/>
          </IconButton>          
        </div>
      </div>
      <ChatMessages/>
      <Input/>
    </div>
  )
}

export default Chat