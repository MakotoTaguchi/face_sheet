import React from "react";
import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";

import MessageInputField from "./chat/MessageInputField";

const ChatSpace = ({id}) => {
  return(
    <div>
      <ChatMsg
        avatar={""}
        messages={[
          "Hi Jenny, How r u today?",
          "Did you train yesterday",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
        ]}
      />
      <ChatMsg
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out",
        ]}
      />
      <ChatMsg avatar={""} messages={["Im good.", "See u later."]} />
      <MessageInputField id={id} />
    </div>
  );
}


export default ChatSpace;
