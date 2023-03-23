import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, Link,TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext';
import { useEffect } from 'react';
import Logo from '../assets/Images/logo.png'
import { motion } from 'framer-motion';
import GoogleLogin from 'react-google-login';
import {gapi} from 'gapi-script'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleLogo from '../assets/Images/googlelogo.png'


// const ENDPOINT = process.env.REACT_APP_BASE_URL
const ENDPOINT = 'https://api.pureseed.in'
const clientId = '60129324500-acmj7o0bujlmlvuo4uq7n4a6nnmlbm19.apps.googleusercontent.com'

const Signin = () => {

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
  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const navigate = useNavigate()

  const {userLoginDetails, dispatch} = useContext(AuthenticationContext)

  const handleCallbackResponse = async(response)=>{

    console.log(response)
    // const {data} = await axios.post('https://api.pureseed.in/auth/google_login/', {'access_token':response.credential}, {
    //   headers:{
    //     'content-type': 'application/json'
    //   }
    // })
    // dispatch({
    //   type :'USER_LOGIN',
    //   payload :data
    // })
    // localStorage.setItem('userLoginDetails', JSON.stringify(data)) 
    // navigate(-1)
    // toast.success('Login in Successfully ')
  }

  useEffect(()=>{


    if(userLoginDetails){
      navigate('/profile')
    }
   
    
  }, [])

  
  const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(`${ENDPOINT}/api/users/login/`, {'username':email, 'password':password}, 
        {headers:{
          'content-type': 'application/json'
        }}
        )
        dispatch({
          type :'USER_LOGIN',
          payload :data
        })
        localStorage.setItem('userLoginDetails', JSON.stringify(data)) 
        navigate(-1)
        toast.success('Login in Successfully ')
      

      } catch (error) {
        toast.error('Bad Request')
      }
  } 
  
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
    <>
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    
    >
    <Container component='main' maxWidth='xs' sx={{minHeight:'100vh'}}>
      <Box sx={{pt:13, display:'flex', flexDirection:'column', alignItems:'center',}}>

              <Avatar
              alt='logo'
              src={Logo}
              sx={{width:170, height:170}}
            />
          <Typography component='h1' variant='h5' sx={{pt:2, fontFamily:'avenir'}}>Sign in</Typography>
        </Box>
        <Box component='form' onSubmit={handleSubmit} sx={{mt:1}}>
        <TextField 
           label='Email'
           fullWidth
           autoFocus
           margin='normal'
           name='email'
           autoComplete='email'
           id='email'
           type='email'
           value = {email}
           onChange = {(e)=>setEmail(e.target.value)}
           sx={{
            "& .MuiInputLabel-root": {color: 'white'}//styles the label
          }}
          variant='outlined'
           />
            <TextField
        type='password'
        id='password'
        required
        fullWidth
        label='Password'
        margin='normal'
        value = {password}
        onChange = {(e)=>setPassword(e.target.value)}
        sx={{
          "& .MuiInputLabel-root": {color: 'white'}//styles the label
        }}
        
        />
        <Button type='submit' fullWidth variant='outlined'  sx={{mt:2, mb:2, color:'inherit', borderColor:'brown', ':hover':{bgcolor:'brown'}}}>Sign in</Button>

        <Grid container>
          <Grid item xs> 
            <Link onClick={()=>navigate('/forgot_password')} sx={{color:'inherit'}} underline='hover'>Forgot Password</Link>
          </Grid>
          <Grid item xs>
              <Link  sx={{color:'inherit'}} onClick={()=>navigate('/signup')} variant='body2'>No Account? Sign up</Link>
          </Grid>
        </Grid>
        {/* <Button startIcon={<GoogleIcon/>} fullWidth  sx={{mt:2, mb:2, color:'inherit', ":hover":{bgcolor:'red'}}}>Login With Google</Button> */}
          <Box sx={{display:'flex',justifyContent:'center', mt:2, pb:4}}>
         {/* <Button id='signInDiv'  >Sign In With Google</Button> */}
         
         {/* <div id='signInDiv'>

          </div> */}

          <Button  size='small' startIcon={<Box component='img' src={GoogleLogo} sx={{width:40, height:40}}/>} variant='contained' sx={{backgroundColor:'black', color:'white' , ':hover':{backgroundColor:'black'}}} onClick = {()=>{login()}}>
                Sign in with Google
          </Button>

        </Box>
        </Box>
        </Container>   
        </motion.div> 
      </>
       
  )
}
//sd
export default Signin;