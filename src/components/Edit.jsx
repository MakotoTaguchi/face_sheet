import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";

import "./css/Edit.css";
import Manage from "./Manage";

const theme = createTheme();

function Edit(props) {
  const [num, setNum] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("id"),
      name: data.get("name"),
      email: data.get("email"),
      point: data.get("point"),
      role: data.get("role"),
    });

    const id = Number(data.get("id"));
    const find = props.data.find((data) => data.id === id);

    if (find == data[id]) {
      setNum(2);
      // db追加
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("id", "==", props.count))
      );
      const docId = querySnapshot.docs.map((doc) => doc.id).toString();
      await updateDoc(doc(db, "users", docId), {
        id: Number(data.get("id")),
        name: data.get("name"),
        email: data.get("email"),
        point: Number(data.get("point")),
        role: data.get("role"),
      });
    } else {
      setNum(3);
    }
  };

  const Back = () => {
    setNum(1);
  };

  const Back2 = () => {
    setNum(0);
  };

  return (
    <div>
      {(() => {
        if (num === 1) {
          return <Manage />;
        } else if (num === 2) {
          return (
            <div>
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back}
              />
              <p>変更が完了しました！</p>
            </div>
          );
        } else if (num === 3) {
          return (
            <div>
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back2}
              />
              <p>idが被っています</p>
            </div>
          );
        } else {
          return (
            <div className="Edit">
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back}
              />
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <EditIcon sx={{ m: 1 }} color="info" fontSize="large">
                      <LockOutlinedIcon />
                    </EditIcon>
                    <Typography component="h1" variant="h5">
                      編集
                    </Typography>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="id"
                            name="id"
                            required
                            fullWidth
                            id="id"
                            label="ID"
                            autoFocus
                            defaultValue={props.object.id}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="point"
                            label="笑みポイント"
                            name="point"
                            autoComplete="point"
                            defaultValue={props.object.point}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="role"
                            label="役職"
                            type="role"
                            id="role"
                            autoComplete="role"
                            defaultValue={props.object.role}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="name"
                            label="名前"
                            type="name"
                            id="name"
                            autoComplete="name"
                            defaultValue={props.object.name}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="メールアドレス"
                            name="email"
                            autoComplete="email"
                            defaultValue={props.object.email}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        変更する
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default Edit;
