import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const ChatSearchbar = () => {
  return (
    <div className='chat-searchbar'>
      <div className="searchform">
          <input type="text" placeholder='Find a user'/>
          <div className='send'>
            <IconButton><SearchIcon/></IconButton>
          </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/profile.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default ChatSearchbar