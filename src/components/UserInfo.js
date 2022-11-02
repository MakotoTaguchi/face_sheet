import React from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import "./css/UserInfo.css";

const UserInfo = ({name}) => {
  return (
    <div className="UserInfo">
      <p>ようこそ {name} さん</p>
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
