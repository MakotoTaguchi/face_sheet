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
  const [count, setCount] = useState();
  const [name, setName] = useState();
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
            if(role === "admin"){
              return (
                <List sx={{ width: '100%', maxWidth: 450 }} >
                  {rooms.map((room) =>
                    <ListItem alignItems="flex-start" key={room.members2}>
                      <ListItemButton
                      onClick={() => {
                        setNum(1);
                        setCount(room.members2);
                        setName(room.name2);
                      }}
                      >
                      <ListItemAvatar>
                        <Avatar alt={room.name2} src={room.members2_photoURL[0]} />
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
                          </React.Fragment>
                        }
                      />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              );
            }else {
              return (
                <List sx={{ width: '100%', maxWidth: 450 }} >
                  {rooms.map((room) =>
                    <ListItem alignItems="flex-start" key={room.members}>
                      <ListItemButton
                      onClick={() => {
                        setNum(1);
                        setCount(room.members);
                        setName(room.name);
                      }}
                      >
                      <ListItemAvatar>
                        <Avatar alt={room.name} src={room.members_photoURL} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={room.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              );
            }
          }
        }else{
          return(
            <Talk count={count} name={name} role={role} id={id} />
          );
        }
      })()}
    </div>
  );
}

export default TalkList;