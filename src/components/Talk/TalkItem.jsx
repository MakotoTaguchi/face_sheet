import React, { useRef, useEffect } from "react";
import { 
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

const MessageItem = ({isLastItem, name, text}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isLastItem) {
      ref.current.scrollIntoView({behavior: 'smooth' });
    }
  }, [isLastItem])

  return (  
    <ListItem divider={true} ref={ref} >
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {text}
              </Typography>
          }
        />
      </ListItem>

  );
};

export default MessageItem;