import React from "react";
import GoogleButton from "react-google-button";

function Test1() {
  return (
    <div>
      <GoogleButton
        onClick={() => {
          console.log("Google button clicked");
        }}
      />
    </div>
  );
}

export default Test1;
