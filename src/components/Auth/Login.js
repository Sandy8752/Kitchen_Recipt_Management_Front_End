import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Spinner from "react-bootstrap/Spinner";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toast from "react-bootstrap/Toast";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import TopBar from "./TopBar";
import { url } from "../../App";
import "../../App.css";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(true);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const toggleToast = () => setToastMsg(!toastMsg);

  const togglePw = () => setShowPw(!showPw);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(email, password);

    let res = await axios.post(`${url}/signin`, {
      email,
      password,
    });
    // console.log(res.data);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.sessionToken);
      let userData = JSON.stringify(res.data.user);
      sessionStorage.setItem("user", userData);
      navigate("/home");
    } else {
      alert(res.data.message);
    }
    setLoading(false);
  };

  // console.log(loading);

  return (
    <>
      <TopBar />
      <div>
        <Toast show={toastMsg} onClose={toggleToast} className="toast_wrapper">
          <Toast.Header>
            <strong className="me-auto">Demo Login Credentials</strong>
          </Toast.Header>
          <Toast.Body>
            <div>Email: guest@guest.com</div> <div> Password: Guest@123</div>
          </Toast.Body>
        </Toast>

        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              className="d-flex flex-column align-items-center"
              sx={{
                marginTop: 16,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                className=""
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  type={showPw ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePw}
                          edge="end"
                        >
                          {showPw ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <button
                      className="direct"
                      onClick={() => navigate("/forgot_password")}
                      variant="body2"
                    >
                      Forgot password?
                    </button>
                  </Grid>
                  <Grid item>
                    <button
                      className="direct"
                      onClick={() => navigate("/signup")}
                      variant="body2"
                    >
                      {"Don't have an account?"}
                    </button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}