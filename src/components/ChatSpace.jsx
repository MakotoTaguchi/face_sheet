import React from "react";

import MessageInputField from "./chat/MessageInputField";
import MessageList from "./chat/MessageList";

const ChatSpace = ({id, name, role}) => {
  if(role === "admin"){
    return(
      <div>
        <MessageList />
        <MessageInputField id={id} name={name} />
        
      </div>
    );
  }else {
    return <div><MessageList /></div>
  }
}


export default ChatSpace;
