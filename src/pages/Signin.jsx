import React from 'react'
import { Avatar, Box, Button, Container, Grid, Link, Paper, SvgIcon, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    google:{
      main:'#DB4437'
    }
  }
});

const Signin = () => {
  const navigate = useNavigate();
  return (
    <>
    <ThemeProvider theme={theme}>
    <Container component='main' maxWidth='xs'>
      <Box sx={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'center',}}>

              <Avatar
              alt='logo'
              src='https://img1.wsimg.com/isteam/ip/0feef9a5-f7be-48d5-b948-d2fcb2003283/manxho_%20transparent%20logo%202021-01.png/:/rs=w:320,h:320,cg:true,m/cr=w:320,h:320/qt=q:95'
              sx={{width:170, height:170}}
            />
              <Typography component='h1' variant='h5'>Singin</Typography>
        </Box>
        <Box sx={{mt:1}}>
        <TextField 
           label='Email'
           fullWidth
           autoFocus
           margin='normal'
           name='email'
           autoComplete='email'
           id='email'
           type='email'
           />
            <TextField
        type='password'
        id='password'
        required
        fullWidth
        label='Password'
        margin='normal'
        />
        <Button variant='contained' color='secondary' fullWidth sx={{mt:2, mb:2, bgcolor:'black', ":hover":{bgcolor:'black'}}}>Sing in</Button>

        <Grid container>
          <Grid item xs> 
            <Link underline='hover'>Forgot Password</Link>
          </Grid>
          <Grid item xs>
              <Link onClick={()=>navigate('/signup')} variant='body2'>No Account?Sign up</Link>
          </Grid>
        </Grid>
        <Button startIcon={<GoogleIcon/>} fullWidth color='google' sx={{mt:2, mb:2}}>Login With Google</Button>
        </Box>

        </Container>   
        </ThemeProvider> 
      </>
       
  )
}

export default Signin;