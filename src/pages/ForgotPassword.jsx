import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Images/logo.png'

const ForgotPassword = () => {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
  return (
    <Container component='main' maxWidth='xs' sx={{minHeight:'100vh', pt:12}}>
        <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', pt:4}}>
            <Avatar
            alt='logo'
            src={Logo}
            sx={{width:150, height:150}}
            />
            <Typography variant='h4' sx={{pt:2}}>Forgot Password</Typography>
        </Box>
        <Box component='form' sx={{mt:1}}>
                <TextField
                type='email'
                label='Email'
                placeholder='Enter your Email'
                id='email'
                name='email'
                fullWidth
                value={email}
                onChangeCapture={(e)=>setEmail(e.target.value)}
                sx={{
                    "& .MuiInputLabel-root": {color: 'white'}//styles the label
                  }}
                />
                <Box sx={{display:'flex'}}>
                <Button type='button' fullWidth variant='outlined' sx={{mt:2, color:'inherit', borderColor: 'brown', ":hover":{borderColor:'brown'} }}>Send Reset Link</Button>
                <Button onClick={()=>navigate(-1)} type='button' fullWidth variant='outlined' sx={{mt:2, color:'inherit', borderColor: 'brown', ":hover":{borderColor:'brown'} }}>Go Back</Button>

                </Box>
                
        </Box>

    </Container>
  )
}

export default ForgotPassword