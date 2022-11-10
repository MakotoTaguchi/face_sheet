import React from "react";

import MessageInputField from "./chat/MessageInputField";
import MessageList from "./chat/MessageList";

const ChatSpace = ({id, name}) => {
  return(
    <div>
      <MessageList />
      <MessageInputField id={id} name={name} />
    </div>
  );
}


export default ChatSpace;
