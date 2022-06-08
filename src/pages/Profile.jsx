import { Box, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import AlertToast from '../components/AlertToast'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import {motion} from 'framer-motion'
const Profile = () => {
  const {userLoginDetails} = useContext(AuthenticationContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!userLoginDetails){
      return navigate('/signin')
    }
  },[] )


  return (
    <>
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity:0}}
      
      >
    <Container sx={{height:'100vh'}}>
      <Box sx={{pt:11}}>
      <Typography sx={{textAlign:'center'}} variant='h3'>Profile</Typography>
      <Box sx={{display:'flex', mt:3}}>
     
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
        <Typography align='center'>User Details</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
          disabled
          label='First Name'
          value={userLoginDetails?.first_Name}
          fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
          disabled
          label='Last Name'
          value={userLoginDetails?.last_Name}
          fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
          label='Email'
          value={userLoginDetails?.email}
          disabled
          fullWidth
          />
        </Grid>
      </Grid>  
      <Grid container spacing={2}>
        <Grid item md={12} xs={6}>
          <Typography align='center'>Recent Orders</Typography>
        </Grid>

      </Grid>
      </Box>  
      </Box>
    </Container>
    </motion.div>
    </>
  )
}

export default Profile