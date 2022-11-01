import React from "react";
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';


const MessageSubmitButton = ({inputEl, setText, text,id}) => {
  console.log(id);
  return (
    <IconButton disabled={text === ''} onClick={(e) => {
      console.log('登録');
      setText('');
      inputEl.current.focus();
    }}>
      <SendIcon />
    </IconButton>
  );
};

export default MessageSubmitButton;