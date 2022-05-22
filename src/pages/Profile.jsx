import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
  return (
    <Container sx={{height:'100vh'}}>
      <Box sx={{pt:11}}>
      <Typography sx={{textAlign:'center'}} variant='h3'>Profile</Typography>
      </Box>
    </Container>
  )
}

export default Profile