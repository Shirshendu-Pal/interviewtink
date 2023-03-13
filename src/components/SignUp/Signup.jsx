import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Card,
  Grid,
  Slide,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import { signinUpStyles } from "./signupStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [inputBox, setInputBox] = useState("email");
  const [loader, setLoader] = useState(false);


  const userDeRegister = async () => {
    try {
      const sendData = {
        name: name,
        email: email,
        password:password,
      };
      const res = await api.userRegisterApi(sendData);
      if (res?.data?.success) {
        toast.success("user details added", {
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
        navigate("/login");
      }
    } catch (error) {
      toast.error("some error occured try again", {
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
  };

  return (
    <>
      <Grid container lg={12}  style={{
        justifyContent: 'center',
      }}>
        <Grid item >
          <Card
            style={{
              padding: 20,
              width: 500,
              height: "auto",
              borderRadius: 15,
              marginTop:
                inputBox === "shopdetails" || inputBox === "userdetails"
                  ? "18%"
                  : "30%",
            }}
          >
           
           
            
              <Grid
                container
                style={{
                  justifyContent: "center",
                  marginTop: "15%",
                  marginBottom: 20,
                }}
              >
                <Typography
                  style={{
                    fontSize: 20,
                    fontFamily: "Manrope, sans-serif",
                    color: "#008000",
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  Add your personal details
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
                 <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder="put your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", marginBottom: 20 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", marginBottom: 20 }}
                />

                
              </Grid>
            <Grid
              container
              style={{
                justifyContent: "flex-end",
                marginTop: -20,
              }}
            >
              
                <Grid item>
                  <Button
                    variant="outlined"
                    disabled={!name && !password}
                    onClick={() => {
                      userDeRegister();
                      setLoader(true);
                    }}
                  >
                    {loader ? (
                      <LoadingOutlined
                        style={{ fontSize: 25, color: "#fff" }}
                      />
                    ) : (
                      "Register"
                    )}
                  </Button>
                </Grid>
              
            </Grid>
            <Grid
              container
              style={{
                justifyContent: "center",
                marginTop: 30,
                marginBottom: 15,
              }}
            >
              <Typography
                style={{
                  fontSize: 15,
                  fontFamily: "Manrope, sans-serif",
                  color: "#008000",
                }}
              >
                Already a member?
                <span
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    fontFamily: "Manrope, sans-serif",
                    color: "#008000",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  click here to login
                </span>
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;

