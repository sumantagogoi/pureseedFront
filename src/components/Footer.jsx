import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import fssai from '../assets/Images/fssai.jpg'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ display: 'flex', textAlign:'center', justifyContent: 'center', mt: 7, width: '100%' }}>
        <img src={fssai} alt="" />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 2 , pb: 2, width: '100%' }}>
        <Typography onClick={() => navigate('')} sx={{ cursor: 'pointer', textDecoration: 'none' }}>Refunds And Cancellation</Typography>
        <Typography onClick={() => navigate('')} sx={{ cursor: 'pointer' }}>Terms And Condition</Typography>
        <Typography onClick={() => navigate('')} sx={{ cursor: 'pointer' }}>Privacy Policy</Typography>
      </Box>
    </>

  )
}

export default Footer