import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import SignIn from "./SignIn";
import SignOut from "./SignOut";
import UserInfo from "./UserInfo";

function Home() {
  const [user] = useAuthState(auth);

  return (
  <div>
    {user ? (
      <div>
        <UserInfo />
        <SignOut />
      </div>
    ) :
    <SignIn />
    }
  </div>
  );
}

export default Home;