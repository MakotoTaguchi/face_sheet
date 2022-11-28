import React, { useState } from "react";
import { Button } from '@mui/material';

import TalkList from "./TalkList";

const Talk = ({count, name, id, role}) => {
  const [num, setNum] = useState(0);
  
  return (
    <div>
      {(() => {
        if(num === 0){
          return(
            <div>
              <div>トーク</div>
              <Button
              variant="text"
              onClick={() => {
                setNum(1);
              }}
              >
                戻る
              </Button>
            </div>
          );
        }else {
          return <TalkList role={role} id={id}/>;
        }
      })()}
    </div>
  );
}

export default Talk;