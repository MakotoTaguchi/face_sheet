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

  const judge = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", user.uid))
    );
    querySnapshot.forEach((doc) => {
      setRole(doc.data().role);
      setId(doc.data().id);
    });
  };
  if (user) {
    judge();
    if (id === 0 || isNaN(id)) {
      return <Modal />;
    } else {
      if (role === "admin") {
        return <Admin />;
      } else {
        return <Employee />;
      }
    }
  } else {
    return <SignIn />;
  }

  //   if (role === "admin") {
  //     return (
  //       <div>
  //         {(() => {
  //           if (id === 0 || isNaN(id)) {
  //             return <Modal />;
  //           } else {
  //             return <Admin />;
  //           }
  //         })()}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         {(() => {
  //           if (id === 0 || isNaN(id)) {
  //             return <Modal />;
  //           } else {
  //             return <Employee />;
  //           }
  //         })()}
  //       </div>
  //     );
  //   }
  // } else {
  //   return <SignIn />;
  // }
}

export default Home;
