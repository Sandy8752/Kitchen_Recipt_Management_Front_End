import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Spinner from "react-bootstrap/Spinner";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { url } from "../../App";

const theme = createTheme();

export default function Reset() {
  const [password, setPassword] = useState("");
  const [cf_password, setCf_password] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const { accessToken } = useParams();
  const navigate = useNavigate();

  const togglePw = () => setShowPw(!showPw);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password, cf_password);

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
    }

    if (password === cf_password && password !== "" && cf_password !== "") {
      let res = await axios.post(
        `${url}/reset_password`,
        { password: password },
        { headers: { Authorization: accessToken } }
      );
      if (res.data.statusCode === 200) {
        navigate("/signin");
        alert("Password changed successfully!!");
      } else {
        alert(res.data.message);
      }
    } else {
      alert("Both Passwords should match");
    }
    setLoading(false);
  };

  return (
    <>
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
            <Typography component="h1" variant="h5">
              Reset Password!!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cf_password"
                label="Confirm Password"
                name="cf_password"
                value={cf_password}
                type={showPw ? "text" : "password"}
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
                onChange={(e) => setCf_password(e.target.value)}
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
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}