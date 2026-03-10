import React from 'react'

const Message = () => {
  return (
    <div className='message owner'>
        <div className="messageInfo">
            <img src={`${process.env.PUBLIC_URL}/assets/images/profile.png`} alt="" />
            <span>just now</span>
        </div>
            <div className="messageContent">
                <p>hello</p>
                <img src={`${process.env.PUBLIC_URL}/assets/images/profile.png`} alt="" />
            </div>
    </div>
  )
}

export default Message