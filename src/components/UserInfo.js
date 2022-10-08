import React from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import "./css/UserInfo.css";

const UserInfo = () => {
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
};

export default UserInfo;
