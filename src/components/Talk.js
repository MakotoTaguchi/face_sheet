import React, { useState } from "react";
import { Button } from '@mui/material';

import TalkList from "./TalkList";
import TalkInputField from "./Talk/TalkInputField";
import TalkMessageList from "./Talk/TalkMessageList";

const Talk = ({count, name, id, role}) => {
  const [num, setNum] = useState(0);

  return (
    <div>
      {(() => {
        if(num === 0){
          return(
            <div>
              <Button
              variant="text"
              onClick={() => {
                setNum(1);
              }}
              >
                戻る
              </Button>
              <div>
                <TalkMessageList count={count} id={id} role={role}/>
                <TalkInputField count={count} id={id} role={role}/>
              </div>
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