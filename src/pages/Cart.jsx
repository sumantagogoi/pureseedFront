import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Cart = () => {
  return (
    <Container>
      <Box sx={{mt:12}}>
        <Typography sx={{textAlign:'center'}} variant='h3'>Cart</Typography>
      </Box>
    </Container>
  )
}

export default Cart