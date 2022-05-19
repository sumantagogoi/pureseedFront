import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
const imgs = 'https://images.unsplash.com/photo-1571805341302-f857308690e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'

const CartItem = ({item}) => {
  return (
    <>
    <Card>
        <CardMedia image={item.img} alt={item.title} height='260' component='img'/>
        <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h5'>{item.title}</Typography>
            <Typography variant='h5'>&#8377; {item.price}</Typography>
        </CardContent> 
        <CardActions sx={{justifyContent:'space-between'}}>
            <Box sx={{display:'flex', alignItems:'center'}}>
               <IconButton><RemoveRoundedIcon sx={{fontSize:'30px'}} /></IconButton>
               <Typography variant='h5'>2</Typography>
               <IconButton><AddRoundedIcon sx={{fontSize:'30px'}} /></IconButton>
            </Box>
            <IconButton><ClearRoundedIcon sx={{fontSize:'25px'}}/></IconButton>
        </CardActions>
    </Card>
    </>
  )
}

export default CartItem