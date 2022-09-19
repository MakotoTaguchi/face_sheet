import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";

import { auth, provider } from "../firebase";

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <h1>Googleログイン</h1>
      <Button variant="contained" color="success" onClick={signInWithGoogle}>
        ログイン
      </Button>
    </div>
  );
};

export default SignIn;
