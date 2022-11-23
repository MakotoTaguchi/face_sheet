import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { auth, db } from "../firebase";
import SignIn from "./SignIn";
import Employee from "./Employee/Employee";
import Admin from "./Admin/Admin";
import Modal from "./Modal";

function Home() {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const judge = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", user.uid))
    );
    querySnapshot.forEach((doc) => {
      setName(doc.data().name);
      setRole(doc.data().role);
      setId(doc.data().id);
      setUrl(doc.data().url);
    });
  };

  if (user) {
    judge();
    if (id === 0 || isNaN(id)) {
      return <Modal />;
    } else {
      if (role === "admin") {
        return <Admin name={name} url={url} id={id} role={role}/>;
      } else {
        return <Employee name={name} url={url} id={id} role={role}/>;
      }
    }
  } else {
    return <SignIn />;
  }
}

export default Home;
