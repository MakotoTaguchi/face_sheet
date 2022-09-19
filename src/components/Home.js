import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Face from "./Face";

import SignIn from "./SignIn";
// import SignOut from "./SignOut";
import UserInfo from "./UserInfo";
import UserInfo2 from "./UserInfo2";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          <UserInfo />
          {/* <UserInfo2 /> */}
          {/* <SignOut /> */}
          {/* <Face /> */}
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Home;
