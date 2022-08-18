import React from "react";
import LoginStyles from "../Styles/Login.module.css";
import twadimage from "../Images/twadlogo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Link, TextField, Typography } from "@mui/material";

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

  let navigate = useNavigate();

  const onSubmit = (submitted) => {
    console.log({ submitted });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_LOGIN_URL}`,
      headers: { "Content-Type": "application/json" },
      data: submitted,
    }).then(
      (response) => {
        console.log(response.status);
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
        <Typography variant="h4" sx={{ color: "#4DA8DB" }}>
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
        // maxWidth={400}
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
              // margin="normal"
              marginTop={2}
              type={"text"}
              variant="outlined"
              size="small"
              // autoComplete='new-password'
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
              {...field}
              label="Password *"
              margin="normal"
              type={"password"}
              variant="outlined"
              size="small"
              // autoComplete='new-password'
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
          component="button"
          variant="body2"
          sx={{ mt: 2 }}
          style={{ textDecoration: "none" }}
        >
          Change Password?
        </Link>
      </Box>
      {/* <Box
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        marginBottom={2}
      >
        <Typography variant="body2" sx={{mb: 2}}>Developed by raavan tech</Typography>
      </Box> */}
    </div>
  );
}

export default Login;
