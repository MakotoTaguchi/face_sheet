import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from '@mui/material';

import { auth, provider } from '../firebase';

const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
  <Button variant="contained" color="success" onClick={signInWithGoogle}>
  ログイン
  </Button>
  );
};

export default SignIn;