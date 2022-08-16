import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

const loginPageValidation = {
  usernameEmailError: {
    required: "Username or Email is required",
  },
  passwordError: {
    required: "Password is required",
  },
  // usernamepasswordIncorrect: {
  //   required: "Please enter correct username and password",
  // },
};

function Login() {
  const { control, handleSubmit } = useForm({ defaultValues: {
    username: "",
    password:"",
  }});

  let navigate = useNavigate();

  const onSubmit = (submitted) => {
   console.log({ submitted });

  axios({
      method: "post",
      url: `${process.env.REACT_APP_LOGIN_URL}`,
      headers:{'Content-Type': 'application/json'},
      data: submitted,
    })
    .then(
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
  }
 
  return (
 
   <Box component="form" onSubmit={handleSubmit(onSubmit)}  
  //  sx=
  //      {{
  //       //  m:25
  //       margin: { xs: 25, sm: 25, md: 25, lg: 25, xl: 25 }
  //      }}
       
      >
    {/* <Stack
      m={25}
    > */}
    <Typography 
      variant="h6"
      align="center"
      component="h6"
    >
      TWADPMS
    </Typography>
    {/* <ThemeProvider theme={loginTheme}> */}
      {/* <Grid 
        container
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
  > */}
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Stack 
          mt={2}
          alignItems="center"
          justifyContent="center"
        >
        <Controller 
          name="username"
          control={control}
          defaultValue=""
          // autoComplete="off"
          rules={{ required: true }}
          render={({ field: {...field}, fieldState: {error} }) => (
            <TextField 
              {...field}
              label="Username or Email *"
              variant="outlined"
              size="small"
              // fullWidth
              error={error !== undefined}
              helperText={
                error 
                ? loginPageValidation.usernameEmailError[error.type] 
                // || 
                // loginPageValidation.usernamepasswordIncorrect[error.type]
                : ""
              }
             />
          )}
        />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Stack
          mt={3}
          alignItems="center"
          justifyContent="center"
        >
        <Controller 
          name="password"
          control={control}
          defaultValue=""
          // autoComplete="off"
          rules={{ required: true }}
          render={({ field: {...field}, fieldState: {error} }) => (
            <TextField 
              {...field}
              label="Password *"
              variant="outlined"
              size="small"
              // fullWidth
              error={error !== undefined}
              helperText={
                error 
                ? loginPageValidation.passwordError[error.type] 
                : ""
              }
             />
          )}
        />
        </Stack>
      </Grid>
      {/* </ThemeProvider> */}
      {/* <ThemeProvider theme={loginButton}> */}
        <Stack
          mt={4}
          alignItems="center"
          justifyContent="center"
        >
        <Button
          variant="contained"
          size="medium"
          type="submit"
        >
          LOGIN
        </Button>
      </Stack>
    {/* </ThemeProvider> */}
    {/* </Stack> */}
  </Box>
  )
}

export default Login;
