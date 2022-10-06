import React from "react";
import { auth } from "../firebase";


const UserInfo = () => {

  return (
    <div className="UserInfo">
      <img src={auth.currentUser.photoURL} alt="profilephoto"/>
      <p>{auth.currentUser.displayName}</p>
      {/* {users.map((user) => (
        <h1 key={user.displayName}>
          {user.displayName}
          </h1>
      ))} */}
    </div>
    
  );
};

export default UserInfo;