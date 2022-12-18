import React, { useState } from "react";
import { TextField } from '@mui/material';
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

import { db, auth } from '../../firebase';

const TalkField = ({ inputEl, setText, text, count, id, role }) => {
  const [isComposed, setIsComposed] = useState(false);
  let column;
  let column2;
  if (role === "admin") {
    column = "members2";
    column2 = "members";
  } else {
    column = "members";
    column2 = "members2";
  }

  const pushTalkMessage = async ({text}) => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "rooms"),
        where(column, "==", count),
        where(column2, "==", id)
      )
    );
    const q = querySnapshot.docs.map((doc) => doc.id).toString();
    const collectionPath = collection(db, "rooms", q, "messages");
    addDoc(collectionPath, {
      createdAt: serverTimestamp(),
      id: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      text: text,
      photoURL: auth.currentUser.photoURL,
    });
  }

  return (
  <TextField 
  autoFocus
  variant="standard"
  fullWidth={true} 
  inputRef={inputEl}
  onChange={(e) => {setText(e.target.value);
  }}
  onKeyDown={(e) => {
    if (isComposed) return;

    const text = e.target.value;
    if (text === '') return;

    if(e.key === 'Enter'){
      pushTalkMessage({text});
      setText('');
      e.preventDefault();
    }
  }}
  onCompositionStart={() => setIsComposed(true)}
  onCompositionEnd={() => setIsComposed(false)}
  value={text}
  />
  );
};

export default TalkField;