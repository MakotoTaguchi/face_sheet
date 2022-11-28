import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {
  collection,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";
import { useEffect } from "react";
import Talk from "../components/Talk"


const TalkList = ({ role, id }) => {
  const [rooms, setRooms] = useState();
  const [num, setNum] = useState(0);
  let column;
  if (role === "admin") {
    column = "members";
  } else {
    column = "members2";
  }

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where(column, "==", id));
    onSnapshot(q, (room) => {
      setRooms(room.docs.map((doc) => (doc.data())));
    });
  }, [column, id]);


  return (
    <div>
      {(() => {
        if(num === 0){
          if (rooms !== undefined) {
            return (
              <List sx={{ width: '100%', maxWidth: 450 }} >
                {rooms.map((room) =>
                  <ListItem alignItems="flex-start" key={room.members2}>
                    <ListItemButton
                    onClick={() => {
                      setNum(1);
                    }}
                    >
                    <ListItemAvatar>
                      <Avatar alt={room.name2} src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={room.name2}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                          </Typography>
                          {"I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            );
          }
        }else{
          return(
            <Talk role={role} id={id} />
          );
        }
      })()}
    </div>
  );
}

export default TalkList;