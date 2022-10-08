import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { 
  collection,  
  query, 
  where, 
  getDocs, 
} from "firebase/firestore";

import { auth, db } from "../firebase";
import SignIn from "./SignIn";
import User from "./Employee";
import Admin from "./Admin";

function Home() {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState('');

  const judge = async () => {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)));
    querySnapshot.forEach((doc) => {
      setRole(doc.data().role);
  });
  }

  if(user) {
    judge();
    if(role === 'admin'){
      return(
        <div>
          <Admin />
        </div>
      );
    }else {
      return(
        < User />
      )
    }
  }else{
    return(
    <SignIn />
    );
  }

}

export default Home;