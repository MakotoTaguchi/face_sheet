import React from "react";
import { 
  signInWithPopup, 
  getAdditionalUserInfo
} from "firebase/auth";
import { Button } from '@mui/material';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

import { auth, provider, db } from '../firebase';

// グーグルログイン
const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser
      if(isNewUser){
        addDB();
      }else {
        updateDB();
      }
    })
    .catch((e) => {
      alert(e.message);
    });
  };

  // ドキュメント追加
  const addDB = async () => {
    await addDoc(collection(db, "users"), {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      login: serverTimestamp(),
      uid: auth.currentUser.uid,
    });
  }

  // ドキュメントフィールド更新
  const updateDB = async () => {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("uid","==", auth.currentUser.uid)));
    const docId = querySnapshot.docs.map((doc) => (doc.id)).toString();
    await updateDoc(doc(db, "users", docId), {
      login: serverTimestamp(),
    });
  }

  return (
  <Button variant="contained" color="success" onClick={signInWithGoogle}>
  ログイン
  </Button>
  );
};

export default SignIn;