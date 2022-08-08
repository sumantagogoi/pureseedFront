import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, ListItemText, Radio, RadioGroup, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";

import ProductContext from "./context/product/productcontext";
import {useNavigate} from 'react-router-dom'

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {motion} from 'framer-motion'
import { Pincode } from "../assets/DATA/pincode";
import { toast } from "react-toastify";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';



const CartDrawer = ({ showCart, setShowCart }) => {


  const getAssamDeliveryCharge = (tweight)=>{
      const weightInKg = tweight / 1000;
      if(weightInKg < 1){
        return 90
      }
      const roundedWeight = Math.floor(weightInKg); 
      return roundedWeight * 90
  }


  const getWithinIndiaDeliveryCharge = (tweight)=>{
    const weightInKg = tweight / 1000 
    if (weightInKg <= 0.5){
      return 100;
    }else if(weightInKg > 0.5 && weightInKg <= 1){
      return 190;
    }
    const numberOf500s = Math.ceil((tweight - 1000) / 500);
  	return numberOf500s * 100 + 190;
  }

  const shipping_price = (tweight, place)=>{
   switch (place){
    case "India":{
      return getWithinIndiaDeliveryCharge(tweight)
    }
    default:
      return getAssamDeliveryCharge(tweight)
   }
}
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
    const {cartItems, dispatch, removeFromCart, shippingValue, setShippingValue} = useContext(ProductContext)
   
 
  if (cartItems?.length > 0){
    cartItems.subTotal = cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)
    cartItems.totalWeight = cartItems.reduce((acc, item)=> acc + item.qty * Number( item.weight), 0)
    cartItems.shippingPrice = shipping_price(cartItems?.totalWeight, shippingValue)
  }
  // calling the function here of shipping to calculate the shipping price but its not behaving as i should want, like the weight increase when user add more item and increment the item 

  



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

  const checkPincode = (code)=>{
    const pin = Pincode.includes(parseInt(code))
    if (pin){
      toast.success('Your Area is servicable')
    }else{
      toast.error('Sorry! your area is not serviceable yet!')
    }
  }
  

  return (
    <>
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >

    
    
      <SwipeableDrawer
        anchor="right"
        open={showCart}
        onClose={() => setShowCart(false)}
        onOpen={() => setShowCart(true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box sx={{width:300}}>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', ml:3, mt:2}}>
          <CancelRoundedIcon fontSize='large' onClick={()=>setShowCart(false)}/>
          </Box>
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
                  <div  key={item._id}>
                  <ListItem>
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
                    <IconButton onClick={()=>removeFromCart(item._id)}>
                     <ClearRoundedIcon />
                    </IconButton>
                 </Box>
                  </div>
              ))}
              <Divider/>
              <ListItem>
                  <ListItemText>Subtotal:</ListItemText>
                  <Typography>&#8377; {cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)}</Typography>
              </ListItem>
              <ListItem>
                  <ListItemText>Total Weight:</ListItemText>
                  <Typography>{cartItems?.totalWeight / 1000 } KG</Typography>
              </ListItem>
              <ListItem>
                <ListItemText>Shipping Price:</ListItemText>
                <Typography>&#8377; {cartItems?.shippingPrice} </Typography>
              </ListItem>
              

              <ListItem>
                <ListItemText>Total:</ListItemText>
                <Typography>&#8377; {cartItems?.subTotal + cartItems.shippingPrice}  </Typography>
              </ListItem>
              <ListItem>
               <FormControl>
                 <FormLabel id='shipping-location-label' >Shipping Location:</FormLabel>
                 <RadioGroup row
                  name='shipping-location-group'
                  aria-labelledby = 'shipping-location-label'
                  value={shippingValue}
                  onChange={(e)=>setShippingValue(e.target.value)}
                 >
                    <FormControlLabel value = 'Assam' control={<Radio/>} label='Assam'/>
                    <FormControlLabel value = 'India' control={<Radio/>} label='Within India'/>
                 </RadioGroup>
               </FormControl>
                  
              </ListItem>
              
              <Button onClick={()=>navHandler('checkout')} variant='outlined' fullWidth sx={{mt:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Checkout</Button>
          </List>
              </>
          )}
          

        </Box>
      </SwipeableDrawer>
      </motion.div>
    </>
  );
};

export default CartDrawer;
