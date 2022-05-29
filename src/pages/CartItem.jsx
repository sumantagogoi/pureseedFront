import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ProductContext from '../components/context/product/productcontext';


const CartItem = ({item}) => {
  const {removeFromCart, addtoCart, dispatch} = useContext(ProductContext)

  const increment = (id)=>{
    dispatch({
      type:'INCREMENT',
      payload:id
    })
  }
  const decrement = (id)=>{
    dispatch({
      type:'DECREMENT',
      payload: id
    })
  }
  
  
  return (
    <>
    <Card>
        <CardMedia
        image={`https://abdulrasid82.pythonanywhere.com/${item.image}`}
        alt={item.title}
        height='260'
        component='img'/>
        <CardContent sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h5'>{item.name}</Typography>
            <Typography variant='body2'>{item.qty} x {item.price} &#8377; {Number(item.price * item.qty).toFixed(0)} </Typography>
        </CardContent> 
        <CardActions sx={{justifyContent:'space-between'}}>
            <Box sx={{display:'flex', alignItems:'center'}}>
               <IconButton onClick={()=>decrement(item)} ><RemoveRoundedIcon sx={{fontSize:'30px'}} /></IconButton>
                 <Typography variant='h5'>{item.qty}</Typography>
               <IconButton onClick={()=>increment(item)} ><AddRoundedIcon sx={{fontSize:'30px'}} /></IconButton>
            </Box>
            <IconButton onClick={()=>removeFromCart(item._id)}><ClearRoundedIcon sx={{fontSize:'25px'}}/></IconButton>
        </CardActions>
    </Card>
    </>
  )
}

export default CartItem