import React, { useState } from "react";
import LoginStyles from "../Styles/Login.module.css";
import twadimage from "../Images/twadlogo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const loginPageValidation = {
  usernameEmailError: {
    required: "Username or Email is required",
  },
  passwordError: {
    required: "Password is required",
  },
  usernamepasswordInvalid: {
    required: "Please enter valid username and password",
  },
};

function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [values, setValues] = useState({showPassword: false});

  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const onSubmit = (submitted) => {
    console.log({ submitted });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_LOGIN_URL}`,
      headers: { "Content-Type": "application/json" },
      data: submitted,
    }).then(
      (response) => {
        console.log(response);
        sessionStorage.setItem(
          "Token",
          response.data.tokenType + " " + response.data.accessToken
        );
        if (
          response.data.accessToken === "" ||
          response.data.accessToken === null
        ) {
          navigate("/");
        } else {
          navigate("/applayout");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className={LoginStyles.Login}>
      {/* login form left side */}
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={22.5}
        marginRight={10}
      >
        <Typography variant="h4" sx={{ color: "#4DA8DB" }} fontWeight="fontWeightBold">
          TWADPMS
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          At one place where you get all information about project
        </Typography>
      </Box>

      {/* login form right side */}

      <Box
        className={LoginStyles.LoginForm}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection={"column"}
        minWidth={400}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={15}
        marginRight={20}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Box marginTop={2} component="img" alt="TWAD LOGO" src={twadimage} />
        <Typography
          variant="h6"
          padding={3}
          textAlign="center"
          component="h6"
          sx={{ color: "#4DA8DB" }}
        >
          Welcome to TWADPMS
        </Typography>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Username or Email *"
              marginTop={2}
              type={"text"}
              InputProps={{
                autoComplete: 'new-password',
                form:{
                  autoComplete: 'off'
                }
              }}
              variant="outlined"
              size="small"
              error={error !== undefined}
              helperText={
                error ? loginPageValidation.usernameEmailError[error.type] : ""
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <TextField
              sx={{width: '210px'}}
              {...field}
              label="Password *"
              margin="normal"
              type={values.showPassword? "text" : "password"}
              InputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off'
                },
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              size="small"
              error={error !== undefined}
              helperText={
                error ? loginPageValidation.passwordError[error.type] : ""
              }
            />
          )}
        />
        <Button variant="contained" sx={{ mt: 2 }} size="medium" type="submit">
          LOGIN
        </Button>
        <Link
          href="#"
          component="button"
          variant="body2"
          sx={{ mt: 1}}
          underline="hover"
        >
          Change Password?
        </Link>
      </Box>
      <Paper
        component="footer"
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
        }}
      >
      <Box
        flexGrow={1}
        display="flex"
        justifyContent={"center"}
        marginBottom={0}
      >
        <Typography variant="caption" sx={{color: '#808080'}}>Developed by raavan tech &copy; 2022</Typography>
      </Box>
      </Paper>
    </div>
  );
}

export default Login;
