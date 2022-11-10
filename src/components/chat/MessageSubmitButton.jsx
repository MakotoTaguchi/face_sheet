import React from "react";
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';

import { pushMessage } from "../../firebase";

const MessageSubmitButton = ({inputEl, setText, text, name}) => {
  return (
    <IconButton disabled={text === ''} onClick={(e) => {
      pushMessage({ name, text })
      setText('');
      inputEl.current.focus();
    }}>
      <SendIcon />
    </IconButton>
  );
};

export default MessageSubmitButton;