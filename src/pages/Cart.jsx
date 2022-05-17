import { Box, Card, CardMedia, Container, Grid, Typography, CardContent, IconButton, Paper, Stack } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';






const imgs = 'https://images.unsplash.com/photo-1571805341302-f857308690e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'

const Cart = () => {

  const [item, setItem] = useState(0)

  const increment = ()=>{
        setItem((prev)=>prev +1)
  }
  const decrement = ()=>{
    setItem((prev)=>prev -1)
  }


  return (
    <Container>
      <Box sx={{mt:12}}>
        <Typography sx={{textAlign:'center'}} variant='h3'>Cart</Typography>
      </Box>
      <Grid container >


        <Grid item md={4}>

        </Grid>

      </Grid>
    </Container>
  )
}

export default Cart