import React, {Component} from "react";
import Wrapper from "../components/wrapper";
import ChatSidebar from '../components/chatroom/chat-sidebar';
import Chat from "../components/chatroom/chat";


const Message: React.FC = () => {
    return(
        <Wrapper>
        <div className="dashboard-container">
            <div className="message-home">
            <div className="message-container">
                <ChatSidebar />
                <Chat />  
            </div> 
            </div>
        </div> 
        </Wrapper>
    )
}

export default Message;