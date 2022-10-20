import * as React from "react";
import * as ReactDOM from "react-dom";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./css/ChatSpace.css";

const MessageTemplate = (props) => {
  return (
    <div className="k-bubble">
      <div>{props.item.text}</div>
    </div>
  );
};

const user = {
  id: 1,
  name: "Jane",
  avatarUrl:
    "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
};

const ChatSpace = () => {
  const [messages, setMessages] = React.useState([]);

  const addNewMessage = (event) => {
    setMessages([...messages, event.message]);
  };

  return (
    <div className="ChatSpace">
      <Chat
        className="Chat"
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        width={400}
        messageTemplate={MessageTemplate}
      />
    </div>
  );
};

export default ChatSpace;
