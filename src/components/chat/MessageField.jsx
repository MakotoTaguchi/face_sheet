import React, { useState } from "react";
import { TextField } from '@mui/material';

const MessageField = ({ inputEl, setText, text }) => {
  const [isComposed, setIsComposed] = useState(false);

  return (
  <TextField 
  autoFocus
  variant="standard"
  fullWidth={true} 
  inputRef={inputEl}
  onChange={(e) => {setText(e.target.value);
  }}
  onKeyDown={(e) => {
    if (isComposed) return;

    const text = e.target.value;
    if (text === '') return;

    if(e.key === 'Enter'){
      setText('');
      e.preventDefault();
    }
  }}
  onCompositionStart={() => setIsComposed(true)}
  onCompositionEnd={() => setIsComposed(false)}
  value={text}
  />
  );
};

export default MessageField;