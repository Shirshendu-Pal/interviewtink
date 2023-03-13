import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  createTheme,
  CssBaseline,
  Divider,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [pokemon, setpokemon] = useState();

  




  

  const userLogin = async () => {
    try {
      const sendData = {
        email: email,
        password: password,
      };
      const res = await api.userLoginApi(sendData);
      if (res?.data?.success) {
        Cookies.set('userId', res.data.user._id, { expires: 7 })
        Cookies.set('accessToken', res.data.tokens.access.token, { expires: 7 })
        Cookies.set('refreshToken', res.data.tokens.refresh.token, { expires: 7 })
        localStorage.setItem('userId',res.data.user._id)
        localStorage.setItem('accessToken',res.data.tokens.access.token)
        localStorage.setItem('refreshToken',res.data.tokens.refresh.token)
        navigate("/dashboard");
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <>
      <Grid container lg={12} 
    style={{
        justifyContent: 'center',
    }}
      >
        <Grid item>
          <Card
            style={{
              padding: 20,
              width: 500,
              height: "auto",
              borderRadius: 15,
              marginTop: "30%",
            }}
          >
            <Grid
              container
              spacing={2}
              style={{
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
              }}
            >
             
             
            </Grid>
            <Grid container style={{ justifyContent: "center" }}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                placeholder="put your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", marginBottom: 20, marginTop: 20 }}
              />
              <TextField
                id="outlined-basic"
                type="password"
                label="Password"
                variant="outlined"
                placeholder="put your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              container
              style={{ justifyContent: "flex-end", marginTop: 5 }}
            >
           
            </Grid>
            <Grid
              container
              style={{ justifyContent: "center", marginTop: "10%" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  userLogin();
                  setLoader(true);
                }}
              >
                {loader ? (
                  <LoadingOutlined style={{ fontSize: 25, color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>

            <Grid
              container
              style={{
                justifyContent: "center",
                marginTop: 18,
                marginBottom: 20,
              }}
            >
              <Typography
                style={{
                  fontSize: 15,
                  fontFamily: "Manrope, sans-serif",
                  color: "#008000",
                }}
              >
                Not a member yet?
                <span
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    fontFamily: "Manrope, sans-serif",
                    color: "#008000",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  click here to signup
                </span>
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
