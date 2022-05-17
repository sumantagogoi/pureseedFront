import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

// const theme = createTheme({
//   palette: {
//     google:{
//       main:'#DB4437'
//     }
//   }
// });

const Signup = () => {

  const navigate = useNavigate()
  return (
   
   <Container component='main' maxWidth='xs'>
     <Box
     sx={{marginTop:8, display:'flex', flexDirection:'column', alignItems:'center',}}
     >
       
       <Avatar
              alt='logo'
              src='https://img1.wsimg.com/isteam/ip/0feef9a5-f7be-48d5-b948-d2fcb2003283/manxho_%20transparent%20logo%202021-01.png/:/rs=w:320,h:320,cg:true,m/cr=w:320,h:320/qt=q:95'
              sx={{width:170, height:170}}
            />
        <Typography component='h1' variant='h5'>Signup</Typography>

        <Box component='form' sx={{mt:2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name='firstName'
              required 
              fullWidth
              id='firstName'
              label='First Name'
              autoFocus/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField name='lastName'
                  required 
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  autoFocus/>
            </Grid>

            <Grid item xs={12}>
              <TextField
              required
              fullWidth
              id='email'
              name='email'
              label='Email Address'
             
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              required
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              required
              fullWidth
              id='confirmPassword'
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              />
            </Grid>
          </Grid>
          <Button variant='outlined' fullWidth sx={{mt:2, mb:2, color:'inherit', ':hover':{bgcolor:'brown'}}}>Signup</Button>
          <Grid container justifyContent='flex-end'>
              <Grid item >
                  <Link onClick={()=>navigate('/signin')} variant='body2'>Already have an account? Sign in</Link>
              </Grid>
          </Grid>
          <Button startIcon={<GoogleIcon/>} fullWidth  sx={{mt:2, mb:2}}>Signup With Google</Button>
        </Box>

     </Box>

   </Container>
  
  )
}

export default Signup