import React from "react";
import { auth } from "../firebase";

const UserInfo = () => {
  return (
    <div className="UserInfo">
      <img src={auth.currentUser.photoURL} alt="profilephoto"/>
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
};

export default UserInfo;