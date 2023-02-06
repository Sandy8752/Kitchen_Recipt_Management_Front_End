import React, { useState } from "react";
import axios from "axios";
import { url } from "../../App";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Spinner from "react-bootstrap/Spinner";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TopBar from "./TopBar";

const theme = createTheme();

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(email);
    if (email !== "") {
      let res = await axios.post(`${url}/forgot_password`, { email: email });
      // console.log(res.data);
      if (res.data.statusCode === 200) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } else {
      alert("Kindly enter your registered email");
    }
    setLoading(false);
  };

  return (
    <>
      <TopBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="f">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password??
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "400px" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
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
                  "Submit"
                )}
              </Button>
            </Box>
            {/* <Grid container >
              <Grid item >
                <button
                  className="direct"
                  onClick={() => navigate("/login")}
                  variant="body2"
                >
                  {"Sign In"}
                </button>
              </Grid>
            </Grid> */}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}