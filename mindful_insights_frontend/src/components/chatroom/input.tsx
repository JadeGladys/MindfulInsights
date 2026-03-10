import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconButton } from '@mui/material';

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something..' />
      <div className="send">
      <IconButton><AttachFileIcon/></IconButton>
      <input type="file" style={{display:'none'}} id="file"/>
      <label htmlFor="file">
      <IconButton><AddPhotoAlternateIcon/></IconButton>
      </label>
      <button className='button'>Send</button>
      </div>
    </div>
  )
}

export default Input