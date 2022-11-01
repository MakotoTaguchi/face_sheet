import React, {useState, useRef } from "react";
import { Grid } from '@mui/material';
import MessageField from './MessageField';
import MessageSubmitButton from './MessageSubmitButton';



const MessageInputField = ({id}) => {
  const inputEl = useRef(null);
  const [text, setText] = useState('');
  return (
  <div>
    <Grid container>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={10}>
        <MessageField 
        inputEl={inputEl}
        setText={setText} 
        text={text} 
        />
      </Grid>
      <Grid item xs={1}>
        <MessageSubmitButton 
        id={id}
        inputEl={inputEl}
        setText={setText} 
        text={text}
        />
      </Grid>
    </Grid>
  </div>
  )
};

export default MessageInputField;