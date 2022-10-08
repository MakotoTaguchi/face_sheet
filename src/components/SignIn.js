import * as React from "react";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";

import "./css/SignIn.css";
import background from "./assets/bgimg.jpg";

import { auth, provider, db } from "../firebase";

// コピーライトの書籍設定
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.nao.net.it-chiba.ac.jp/">
        Nakamura Lab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

// グーグルログイン
const SignIn = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
      if (isNewUser) {
        addDB();
      } else {
        updateDB();
      }
    });
  };

  // ドキュメント追加
  const addDB = async () => {
    await addDoc(collection(db, "users"), {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      login: serverTimestamp(),
      point: 0,
      role: "employee",
      uid: auth.currentUser.uid,
    });
  };

  // ドキュメントフィールド更新
  const updateDB = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
    );
    const docId = querySnapshot.docs.map((doc) => doc.id).toString();
    await updateDoc(doc(db, "users", docId), {
      login: serverTimestamp(),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            className="loginBox"
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <GoogleButton
                className="firstButton Button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signInWithGoogle}
              />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
