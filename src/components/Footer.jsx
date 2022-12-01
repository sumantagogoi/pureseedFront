import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate = useNavigate()
  return (
    <Box sx={{display:'flex', justifyContent:'center',  gap:'20px', mt:5, pb:2, width:'100%'}}>
        <Typography onClick={()=>navigate('')} sx={{cursor:'pointer', textDecoration:'none'}}>Refunds And Cancellation</Typography>
        <Typography onClick={()=>navigate('')} sx={{cursor:'pointer'}}>Terms And Condition</Typography>
        <Typography onClick={()=>navigate('')} sx={{cursor:'pointer'}}>Privacy Policy</Typography>
    </Box>
  )
}

export default Footer