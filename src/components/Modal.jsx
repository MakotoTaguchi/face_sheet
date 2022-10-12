import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal = () => {
  const [open, setOpen] = useState(true);
  const [id, setId] = useState('');

  const updateDB2 = async (id) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
    );
    const docId = querySnapshot.docs.map((doc) => doc.id).toString();
    await updateDoc(doc(db, "users", docId), {
      id: Number(id),
    });
    setId('');
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            社員ID
          <TextField 
          autoFocus
          id="outlined-basic" 
          onChange={(e) => { setId(e.target.value); }}
          variant="outlined"
          inputProps={{ 
            inputMode: 'numeric',
            pattern: '[0-9]*' }}
          value={id}
          size="small"
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              updateDB2(id);
              e.preventDefault();
            }
          }}
          />
          <Button 
          disabled={Number(id) === 0}
          variant="contained"
          size="small"
          onClick={(e) => {
            updateDB2(id);
          }}
          >
            登録
          </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;