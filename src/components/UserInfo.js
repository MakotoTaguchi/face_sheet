import React from "react";
import { auth } from "../firebase";
import SignOut from "./SignOut";
import "./css/UserInfo.css";

const UserInfo = ({name, url}) => {
  return (
    <div className="UserInfo">
      <p>ようこそ {name} さん</p>
      <img
        className="UserImage"
        src={url}
        alt="profilephoto"
      />
      <SignOut />
    </div>
  );
};

export default UserInfo;
