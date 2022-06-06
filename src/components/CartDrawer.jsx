import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemText, SwipeableDrawer, TextField, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import ProductContext from "./context/product/productcontext";
import {useNavigate} from 'react-router-dom'

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';



const CartDrawer = ({ showCart, setShowCart }) => {
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const {cartItems, dispatch, removeFromCart} = useContext(ProductContext)
  if (cartItems?.length > 0){
    cartItems.subTotal = cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)
    cartItems.shippingPrice = cartItems.subTotal + 500
    cartItems.cashDiscount = cartItems?.shippingPrice < 1000 ? 0 : cartItems?.shippingPrice - (10/100)
    cartItems.discountAmount = cartItems?.cashDiscount === 0 ? 0 : cartItems?.shippingPrice - cartItems?.cashDiscount
  }
  const navigate = useNavigate()

  const navHandler = (path)=>{
      navigate(`/${path}`);
      setShowCart(()=>false);
  }

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
      <SwipeableDrawer
        anchor="right"
        open={showCart}
        onClose={() => setShowCart(false)}
        onOpen={() => setShowCart(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box sx={{width:350}}>
        
              <Typography variant="h5" align="center" sx={{mt:2, fontFamily:'Roboto'}}>My Cart</Typography>
              
       
          
          <Divider sx={{border:.5}}/>

          {cartItems?.length<1 ? (
              <>
              <Typography variant="h4" align="center" sx={{mt:2, fontFamily:'Roboto'}}>No Items in the cart</Typography>
              </>
          ) : (
              <>
            <List>
              {cartItems?.map((item)=>(
                  <>
                  <ListItem key={item._id}>
                      <Avatar
                      src={`https://api.manxho.co.in${item.image}`}
                      sx={{width:60, height:60}}
                      />
                      <ListItemText sx={{ml:2}}>{item.name}</ListItemText>
                      <Typography variant='body2'>{item.qty} x {item.price} &#8377; {Number(item.price * item.qty).toFixed(0)}</Typography>
                      
                  </ListItem>
                  <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'center',}}>
                    <IconButton onClick={()=>decrement(item)}>
                        <RemoveRoundedIcon/>
                    </IconButton>
                    <Typography variant='h6'>{item.qty}</Typography>
                    <IconButton onClick={()=>increment(item)}>
                        <AddRoundedIcon/>
                    </IconButton>
                    <IconButton>
                     <ClearRoundedIcon onClick={()=>removeFromCart(item._id)}/>
                    </IconButton>
                 </Box>
                  </>
              ))}
              <Divider/>
              <ListItem>
                  <ListItemText>Subtotal:</ListItemText>
                  <Typography>&#8377; {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText>Shipping:</ListItemText>
                <Typography>&#8377; 500 </Typography>
              </ListItem>
              

              <ListItem>
                <ListItemText>Total:</ListItemText>
                <Typography>&#8377; {cartItems.shippingPrice} </Typography>
              </ListItem>
              <ListItem>
               
                <TextField 
              label='Coupon'
              id='coupon'
              name='coupon'
              margin='normal'
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {color: 'white'}//styles the label
              }}
              />
              <Button variant="outlined" sx={{ml:1, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Apply</Button>     
              </ListItem>
              
              <Button onClick={()=>navHandler('checkout')} variant='outlined' fullWidth sx={{mt:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Checkout</Button>
          </List>
              </>
          )}
          

        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default CartDrawer;
