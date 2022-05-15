import React from 'react'
import { Avatar, Box, Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material'

const Sigin = () => {
  return (
    <>
    <Container component='main' maxWidth='sm'>
      <Box
          marginTop={4}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >

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
        <Button variant='contained' fullWidth sx={{mt:2, mb:2, bgcolor:'black', ":hover":{bgcolor:'black'}}}>Sing in</Button>
        <Grid container>
          <Grid item xs> 
            <Link underline='hover'>Forgot Password</Link>
          </Grid>
          <Grid item sx>
              <Link variant='body2'>No Account?Sign up</Link>
          </Grid>
        </Grid>
        </Box>

        </Container>    
      </>
       
  )
}

export default Sigin