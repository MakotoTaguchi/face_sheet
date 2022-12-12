import React, {useState, useRef } from "react";
import { Grid } from '@mui/material';
import TalkField from './TalkField';
import TalkSubmitButton from './TalkSubmitButton';



const TalkInputField = ({count, id, role}) => {
  const inputEl = useRef(null);
  const [text, setText] = useState('');
  return (
  <div>
    <Grid container>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={10}>
        <TalkField 
        inputEl={inputEl}
        setText={setText} 
        text={text} 
        count={count}
        id={id}
        role={role}
        />
      </Grid>
      <Grid item xs={1}>
        <TalkSubmitButton
        id={id}
        inputEl={inputEl}
        setText={setText} 
        text={text}
        count={count}
        role={role}
        />
      </Grid>
    </Grid>
  </div>
  )
};

export default TalkInputField;