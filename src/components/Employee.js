import React from "react";

import UserInfo from "./UserInfo";
import SignOut from "./SignOut";

const Employee = () => {
  return(
    <div>
      <h1>社員</h1>
      < UserInfo />
      < SignOut />
    </div>
  );
}

export default Employee;