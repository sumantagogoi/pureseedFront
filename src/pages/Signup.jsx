import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { toast } from "react-toastify";

import { useEffect } from "react";
import AuthenticationContext from "../components/context/authentication_context/AuthenticationContext";
import Logo from '../assets/Images/logo.png'
import { motion } from "framer-motion";

import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../assets/Images/googlelogo.png'

const clientId = '60129324500-acmj7o0bujlmlvuo4uq7n4a6nnmlbm19.apps.googleusercontent.com'

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false)

  const { userLoginDetails, dispatch } = useContext(AuthenticationContext);
  const navigate = useNavigate();


  const login = useGoogleLogin({
    onSuccess: async(response)=>{
      try {
         const {data} = await axios.post('https://api.pureseed.in/auth/google_login/', {'access_token':response.access_token}, {
          headers:{
            'content-type': 'application/json'
          }
        })
        dispatch({
          type :'USER_LOGIN',
          payload :data
        })
        localStorage.setItem('userLoginDetails', JSON.stringify(data)) 
        navigate(-1)
        toast.success('Login in Successfully ')
        console.log(response)
      } catch (error) {
       toast.error('Something Went Wrong')
      }
    }
  })

  useEffect(() => {

    // function start(){
    //   gapi.auth2.init({

    //   client_id:clientId,
    //   scope:'email'
    //   })
    // }
    // gapi.load('client:auth2', start);
    if (userLoginDetails) {
      navigate("/profile");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return toast.error("Passowrd Doest Not Matched");
      } else {
        setLoading(true)
        const  response  = await axios.post(
          "https://api.pureseed.in/api/users/register/",
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        console.log(response.request.status)
        setLoading(false)
        if(response.request.status === 200){
          toast.success('Account Successfully Created');
          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }
      }
      
    } catch (error) {
      toast.error("Something Went wrong!");
    }
  };

  const onSuccssHandler = async (response)=>{
    console.log(response.accessToken)
    const {data} = await axios.post('https://api.pureseed.in/auth/google_login/', {'access_token':response.accessToken}, {
      headers:{
        'content-type': 'application/json'
      }
    })
    dispatch({
      type :'USER_LOGIN',
      payload :data
    })
    localStorage.setItem('userLoginDetails', JSON.stringify(data)) 
    navigate(-1)
    toast.success('Login in Successfully ')
  }

  const onFailureHandler = (error)=>{
    console.log(error)
  }


  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    
    >
    <Container component="main" maxWidth="xs" sx={{minHeight:'100vh'}}>
      <Box
        sx={{
          pt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
         
        }}
      >
        <Avatar
          alt="logo"
          src={Logo}
          sx={{ width: 170, height: 170 }}
        />
        <Typography component="h1" variant="h5" sx={{fontFamily:'avenir', pt:2}}>
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              color: "inherit",
              borderColor:'brown',
              ":hover": { bgcolor: "brown" },
            }}
          >
            Signup
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => navigate("/signin")}
                variant="body2"
                sx={{ color: "inherit" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Box sx={{display:'flex',justifyContent:'center', mt:2, pb:4}}>

          <Button  size='small' startIcon={<Box component='img' src={GoogleLogo} sx={{width:40, height:40}}/>} variant='contained' sx={{backgroundColor:'black', color:'white' , ':hover':{backgroundColor:'black'}}} onClick = {()=>{login()}}>
                Sign up with Google
          </Button>
          {/* <GoogleLogin
         id='signInButton'
         clientId={clientId}
         onSuccess={onSuccssHandler}
         onFailure={onFailureHandler}
         cookiePolicy={'single_host_origin'}
         theme={'dark'}
         buttonText='Signup with Google'

         /> */}
         </Box>
        </Box>
      </Box>
    </Container>
  </motion.div>
  );
};

export default Signup;
