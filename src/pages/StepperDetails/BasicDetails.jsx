import { Box, TextField } from '@mui/material'
import React from 'react'

const BasicDetails = () => {
  return (
    <Box>
        <TextField 
        id = 'first_name'
        label ='First Name'
        placeholder = 'Enter Your First Name'
        fullwidth
        margin ='normal'
        name = 'firstname'
        />
         <TextField 
        id = 'last_name'
        label ='Last Name'
        placeholder = 'Enter Your Last Name'
        fullwidth
        margin ='normal'
        name = 'lastname'
        />

    </Box>
  )
}

export default BasicDetails