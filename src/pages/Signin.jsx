import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, Link,TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import {toast} from 'react-toastify';

import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext';
import { useEffect } from 'react';
import Logo from '../assets/Images/logo.png'

const ENDPOINT = process.env.REACT_APP_BASE_URL

const Signin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const navigate = useNavigate()

  const {userLoginDetails, dispatch} = useContext(AuthenticationContext)

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
        navigate('/profile')
        toast.success('Login in Successfully ')
      

      } catch (error) {
        toast.error('Bad Request')
      }
  } 




  return (
    <>
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
              <Link  sx={{color:'inherit'}} onClick={()=>navigate('/signup')} variant='body2'>No Account?Sign up</Link>
          </Grid>
        </Grid>
        <Button startIcon={<GoogleIcon/>} fullWidth  sx={{mt:2, mb:2, color:'inherit', ":hover":{bgcolor:'red'}}}>Login With Google</Button>
        </Box>
        </Container>   
        
      </>
       
  )
}

export default Signin;