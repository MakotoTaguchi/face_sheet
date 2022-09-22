import React from "react";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import "./SignIn2.css";

const SignIn2 = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <h1>Googleログイン</h1>
      <GoogleButton
        className="GoogleButton"
        variant="contained"
        color="success"
        onClick={signInWithGoogle}
      />
      <h1>Googleログイン</h1>
      <GoogleButton
        className="GoogleButton"
        variant="contained"
        color="success"
        onClick={signInWithGoogle}
      />
    </div>
  );
};

export default SignIn2;
