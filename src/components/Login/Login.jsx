import React, { useState } from "react";
// import { AppContext } from "../../App";
// import AppLayout from "../MinivariantDrawer/AppLayout";
// import App from "../../App";//New
// import { BrowserRouter as Router } from "react-router-dom";//New
// import validator from 'validator';
// import { ErrorMessage } from '@hookform/error-message';
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
    // validate: "Strong Password",
    // validate:{
    //   strongPassword: "This is a strong password",
    //   weakPassword: "Please enter a strong password"
    // } 
  },
};

function Login(props) {
  console.log(props);
  const { showApp } = props;
 
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    // criteriaMode: "all",
  });
  const [values, setValues] = useState({showPassword: false});
  // const [showApp, setShowApp] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  // const [errorPassword, setErrorPassword] = useState('');

  // var strongPassword = "";
  // var weakPassword= "";

  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // const validatePassword = (value) => {
  //   console.log({value});
  //    if(validator.isStrongPassword(value, {
  //     minLength: 9, minLowercase: 1,
  //     minUppercase: 1, minNumbers: 1,
  //     minSymbols: 1
  //   })) {
  //     // strongPassword = "This is a strong password";
  //     return strongPassword; 
  //     // setErrorPassword("This is a strong password");
  //   }else {
  //     // weakPassword = "Please enter strong password";
  //     return weakPassword;
  //     // setErrorPassword("Please enter a strong password");
  //   } 
  // }

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
          // console.log(!showApp);
          // {!showApp && navigate('/applayout')};
          navigate('/applayout');
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
          rules={{ 
            required: true,
            // validate:(value) => 
            //  validatePassword(value)
            }}
            // onChange={(e) =>validatePassword(e.target.value)}
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
          // {...errorPassword ? strongPassword : weakPassword}
          // onClick={()=>showApp(false)}
        />
        <Button variant="contained" sx={{ mt: 2 }} size="medium" type="submit" 
        onClick={()=>showApp(false)}>
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
