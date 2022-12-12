import React, { useState, useEffect } from "react";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from '../../firebase';

const TalkMessageList = ({ count, id, role }) => {
  const [messages, setMessages] = useState([]);
  let column;
  let column2;
  if (role === "admin") {
    column = "members2";
    column2 = "members";
  } else {
    column = "members";
    column2 = "members2";
  }

  useEffect(() => {
    const querySnapshot = query(
      collection(db, "rooms"),
      where(column, "==", count),
      where(column2, "==", id)
    )
    onSnapshot(querySnapshot, (room) => {
      const q = room.docs.map((doc) => (doc.id)).toString();
      onSnapshot(query(collection(db, "rooms", q, "messages"), orderBy("createdAt"), limit(25)), (snapshot) => {
        let _messages = [];
        snapshot.forEach((doc) => {
          _messages.push(doc.data());
        })
        setMessages(_messages);
      });
    });
  }, [count, id])

  return (
    <div>
      {messages.map((message) => 
      <div key={message.createdAt}>
        <img src={message.photoURL} alt="" />
        {message.text}
      </div>
      )}
    </div>
  );
}

export default TalkMessageList;