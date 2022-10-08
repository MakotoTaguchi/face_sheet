import React from "react";

import SignOut from "./SignOut";
import UserInfo from "./UserInfo";

const Admin = () => {
  return (
    <div>
      <h1>管理者</h1>
      <UserInfo />
      <SignOut />
    </div>
  );
}

export default Admin;