import * as React from "react";
import SignOut from "../SignOut";
import { auth } from "../../firebase";
import "../UserInfo.css";

function User() {
  return (
    <div className="UserInfo">
      <p>ようこそ {auth.currentUser.displayName} さん</p>
      <img
        className="UserImage"
        src={auth.currentUser.photoURL}
        alt="profilephoto"
      />
      <SignOut />
    </div>
  );
}

export default User;
