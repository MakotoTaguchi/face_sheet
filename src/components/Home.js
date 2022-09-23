import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import AdminInfo from "./AdminInfo";

import SignIn3 from "./SignIn3";
import UserInfo from "./UserInfo";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          {/* <UserInfo /> */}
          <AdminInfo />
        </div>
      ) : (
        <SignIn3 />
      )}
    </div>
  );
}

export default Home;
