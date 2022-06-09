import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {motion} from 'framer-motion'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import Logo from '../assets/Images/logo.png'
import { toast } from 'react-toastify'

const ChangePassword = () => {

    const params = useParams()
    const [password, setPassword] = useState('')
    const [confirmPasword, setConfirmPasword] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            if(password !== confirmPasword){
                toast.error('Password does not matched')
            }
        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }

  return (
    <>
    <motion.div>
        <Container component='main' maxWidth='xs' sx={{minHeight:'100vh', pt:13}}>
        <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center'}}>

            <Avatar
            alt='logo'
            src={Logo}
            sx={{width:170, height:170}}
            />
            <Typography component='h1' variant='h5' sx={{pt:2, fontFamily:'avenir'}}>Change Password</Typography>
        </Box>
        <Box component='form' onSubmit={submitHandler} sx={{mt:2}}>
            <TextField
            label='Password'
            type='password'
            id='password'
            name='password'
            fullWidth
            value= {password}
            onChange = {(e)=>setPassword(e.target.value)}
            margin='normal'
            required
            sx={{
                "& .MuiInputLabel-root": {color: 'white'}//styles the label
              }}
            />

            <TextField
            label='Confirm Password'
            type='password'
            id='confirm_password'
            name='confirm_password'
            fullWidth
            value= {confirmPasword}
            onChange = {(e)=>setConfirmPasword(e.target.value)}
            margin='normal'
            required
            sx={{
                "& .MuiInputLabel-root": {color: 'white'}//styles the label
              }}
            />
            <Button type='submit' fullWidth variant='outlined'  sx={{mt:2, mb:2, color:'inherit', borderColor:'brown', ':hover':{bgcolor:'brown'}}}>Update Password</Button>

        </Box>

        </Container>
    </motion.div>
    </>
    
  )
}

export default ChangePassword