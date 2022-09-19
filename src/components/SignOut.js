import React from "react";
import { auth } from "../firebase";
import { Button } from "@mui/material";

const SignOut = () => {
  return (
    <Button variant="contained" color="success" onClick={() => auth.signOut()}>
      サインアウト
    </Button>
  );
};

export default SignOut;
