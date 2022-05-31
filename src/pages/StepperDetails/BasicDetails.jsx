import { Box, Grid, TextField } from '@mui/material'
import React from 'react'

const BasicDetails = () => {
  return (
   <>
   <Grid container spacing={2}>
     <Grid item xs={12} sm={6}>
        <TextField
        required
        id='firstName'
        name='firstName'
        label='First Name'
        fullWidth
        margin='normal'
        />
     </Grid>
     <Grid item xs={12} sm={6}>
        <TextField
        required
        id='lastName'
        name='lastName'
        label='Last Name'
        fullWidth
        margin='normal'
        />
     </Grid>
     <Grid item xs={12} sm={6}>
        <TextField
        required
        id='email'
        name='email'
        label='Email Address'
        fullWidth
        type='email'
        margin='normal'
        />
     </Grid>
     <Grid item xs={12} sm={6}>
        <TextField
        required
        id='phone'
        name='phone'
        label='Phone Number'
        fullWidth
        margin='normal'
        />
     </Grid>
   </Grid>
   </>
  )
}

export default BasicDetails