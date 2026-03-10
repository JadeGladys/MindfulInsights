import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/profile.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image1.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image2.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/PBR-illu.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image3.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/collab-bg.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
      <div className="userChat">
        <img src={`${process.env.PUBLIC_URL}/assets/images/image2.png`} alt="" />
        <div className="userChatInfo">
          <span>Jane</span>
          <p>Hello???</p>
        </div>
      </div>
    </div>
  )
}

export default Chats