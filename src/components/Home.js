import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import SignIn from "./SignIn";
import SignIn2 from "./SignIn2";
import SignIn3 from "./SignIn3";
import UserInfo from "./UserInfo";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          <UserInfo />
        </div>
      ) : (
        // <SignIn />
        // <SignIn2 />
        <SignIn3 />
      )}
    </div>
  );
}

export default Home;
