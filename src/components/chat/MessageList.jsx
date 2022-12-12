import React, { useEffect, useState } from "react";
import { List } from '@mui/material';
import { onValue } from "firebase/database";

import MessageItem from "./MessageItem";
import { messagesRef } from "../../firebase";


const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      if (messages === null) return;
      const entries = Object.entries(messages);
      const newMessages = entries.map(entry => {
        const [key, nameAndtext] = entry;
        return { key, ...nameAndtext };
      });
      setMessages(newMessages);
    });
  }, [])

const length = messages.length;

  return (
  <List >
    {
      messages.map(({key, name, text, photoURL }, index) => {
        const isLastItem = length === index + 1;
        return <MessageItem key={key} name={name} text={text} isLastItem={isLastItem} photoURL={photoURL} />;
      })
    }
  </List>
  );
};

export default MessageList;