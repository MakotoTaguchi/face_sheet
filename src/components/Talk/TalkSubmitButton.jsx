import React from "react";
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

import { db, auth } from '../../firebase';

const TalkSubmitButton = ({inputEl, setText, text, count, id, role }) => {
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
      id: id,
      name: auth.currentUser.displayName,
      text: text,
      photoURL: auth.currentUser.photoURL
    });
  }

  return (
    <IconButton disabled={text === ''} onClick={(e) => {
      pushTalkMessage({text})
      setText('');
      inputEl.current.focus();
    }}>
      <SendIcon />
    </IconButton>
  );
};

export default TalkSubmitButton;