import { Box, Container, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import AlertToast from '../components/AlertToast'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
const Profile = () => {
  const {userLoginDetails} = useContext(AuthenticationContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userLoginDetails){
      return navigate('/signin')
    }
  },[] )


  return (
    <Container sx={{height:'100vh'}}>
      <AlertToast/>
      <Box sx={{pt:11}}>
      <Typography sx={{textAlign:'center'}} variant='h3'>Profile</Typography>
      <Typography>Welcome {userLoginDetails?.first_name} {userLoginDetails?.last_name} </Typography>
      </Box>
    </Container>
  )
}

export default Profile