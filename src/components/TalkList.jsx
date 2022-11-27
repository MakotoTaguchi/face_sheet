import React, { useState } from "react";
import { 
  collection, 
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

import { db, messagesRef } from "../firebase";
import { useEffect } from "react";

const TalkList = ({role, id}) => {
  const [rooms, setRooms] = useState([]);
  let Talk;
  if(role === "admin"){
    Talk = "members";
  }else {
    Talk = "members2";
  }

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where(Talk, "==", id));
    onSnapshot(q, (room) => {
        setRooms(room.docs.map((doc) => ( doc.data() )));
    });
  }, [Talk, id]);

  return (
    <div>
      <div>こんにちは</div>
      {console.log(rooms)}
      <div>
      </div>
      <div>こんばんは</div>
    </div>
  );
}

export default TalkList;