import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, ListItemText, TextField, SwipeableDrawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { useContext, useEffect } from "react";

import ProductContext from "./context/product/productcontext";
import { useNavigate } from 'react-router-dom'

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { motion } from 'framer-motion'
// import { Pincode } from "../assets/DATA/pincode";
import { toast } from "react-toastify";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import axios from 'axios';



const CartDrawer = ({ showCart, setShowCart }) => {

  const getAssamDeliveryCharge = (tweight) => {
    const weightInKg = tweight / 1100;
    if (weightInKg < 1) {
      return 90
    }
    const roundedWeight = Math.floor(weightInKg);
    return roundedWeight * 90
  }


  const getWithinIndiaDeliveryCharge = (tweight) => {
    const weightInKg = tweight / 1000
    if (weightInKg <= 0.55) {
      return 100;
    } else if (weightInKg > 0.55 && weightInKg <= 1.1) {
      return 190;
    }
    const numberOf500s = Math.ceil((tweight - 1100) / 520);
    return numberOf500s * 100 + 190;
  }

  const shipping_price = (tweight, place) => {
    switch (place) {
      case "ASSAM": {
        return getAssamDeliveryCharge(tweight)
      }
      case "INDIA": {
        return getWithinIndiaDeliveryCharge(tweight)
      }
      default:
        return 0;
    }
  }
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { cartItems, dispatch, removeFromCart, shippingValue, setShippingValue, setZipcode, setPlace } = useContext(ProductContext)

  const [pinCode, setPinCode] = useState('');
  const [isAssam, setIsAssam] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isMore300, setIsMore300] = useState(false);

  const handlePinCodeChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (value.length <= 6) {
      setPinCode(value);
    }
  };

  const handlePinCodeKeyUp = async (event) => {
    if (pinCode.length === 6) {
      try {
        const response = await axios.get(`https://api.manxho.co.in/api/check_pincode/${pinCode}/`);
        setShippingValue(response.data.state);
        setIsLoading(false);
        setZipcode(pinCode);
        setPlace(response.data.place)
        setIsAssam(response.data.state.toLowerCase() === "assam" ? "ASSAM" : "INDIA");

      }

      catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    if (cartItems?.subTotal >= 300) {
      setIsMore300(true);
    }
    else {
      setIsMore300(false);
    }
  }, [cartItems?.subTotal]
  );


  if (cartItems?.length > 0) {
    cartItems.subTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    cartItems.totalWeight = cartItems.reduce((acc, item) => acc + item.qty * Number(item.weight), 0)
    cartItems.shippingPrice = shipping_price(cartItems?.totalWeight, isAssam)
  }
  // calling the function here of shipping to calculate the shipping price but its not behaving as i should want, like the weight increase when user add more item and increment the item 


  const navigate = useNavigate()

  const navHandler = (path) => {
    navigate(`/${path}`);
    setShowCart(() => false);
  }

  const increment = (id) => {
    dispatch({
      type: 'INCREMENT',
      payload: id
    })
  }
  const decrement = (id) => {
    dispatch({
      type: 'DECREMENT',
      payload: id
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <SwipeableDrawer
          anchor="right"
          open={showCart}
          onClose={() => setShowCart(false)}
          onOpen={() => setShowCart(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <Box sx={{ width: 350, mr: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', ml: 3, mt: 2 }}>
              <CancelRoundedIcon fontSize='large' onClick={() => setShowCart(false)} />
            </Box>
            <Typography variant="h5" align="center" sx={{ mt: 2, fontFamily: 'Roboto' }}>My Cart</Typography>

            <Divider sx={{ border: .5 }} />

            {cartItems?.length < 1 ? (
              <>
                <Typography variant="h5" align="center" sx={{ mt: 2, fontFamily: 'Roboto' }}>No Items in the cart</Typography>
              </>
            ) : (
              <>
                <List>
                  {cartItems?.map((item) => (
                    <div key={item._id}>
                      <ListItem>
                        <Avatar
                          src={`https://api.manxho.co.in${item.image}`}
                          sx={{ width: 60, height: 60 }}
                        />
                        <ListItemText sx={{ ml: 2 }}>{item.name}</ListItemText>
                        <Box>
                          <Typography variant='body2' >{item.qty} x {item.price} &nbsp;&nbsp;</Typography>
                        </Box>
                        <br></br>
                        <Box>
                          <Typography variant='body2'> &#8377;{Number(item.price * item.qty).toFixed(0)}</Typography>
                        </Box>

                      </ListItem>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', bgcolor: '#393939' }}>
                        <IconButton onClick={() => decrement(item)}>
                          <RemoveRoundedIcon sx={{ bgcolor: '#494949' }} />
                        </IconButton>
                        <Typography variant='h6'>{item.qty}</Typography>
                        <IconButton onClick={() => increment(item)}>
                          <AddRoundedIcon sx={{ bgcolor: '#494949' }} />
                        </IconButton>
                        <IconButton onClick={() => removeFromCart(item._id)}>
                          <ClearRoundedIcon sx={{ bgcolor: '#494949' }} />
                        </IconButton>
                      </Box>
                    </div>
                  ))}

                  <Divider />

                  <ListItem>
                    <ListItemText>Subtotal:</ListItemText>
                    <Typography>&#8377; {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Total Weight:</ListItemText>
                    <Typography>{cartItems?.totalWeight / 1000} KG</Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Shipping Price:</ListItemText>
                    <Typography>&#8377; {cartItems?.shippingPrice === 0 ? ' ' : cartItems?.shippingPrice} </Typography>
                  </ListItem>

                  <ListItem>
                    <ListItemText>Total:</ListItemText>
                    <Typography>&#8377; {cartItems?.subTotal + cartItems.shippingPrice}  </Typography>
                  </ListItem>
                  <ListItem>
                    <FormControl>

                      <TextField
                        label="PINCODE of delivery address:"
                        value={pinCode}
                        onChange={handlePinCodeChange}
                        onKeyUp={handlePinCodeKeyUp}
                        variant="outlined"
                        inputProps={{ maxLength: 6, pattern: '[0-9]*' }}
                      />
                      <br />
                    </FormControl>

                  </ListItem>

                  <Button onClick={() => navHandler('checkout')} variant='outlined' fullWidth disabled={isLoading || !isMore300}
                    sx={{ mt: 2, borderColor: 'brown', color: 'inherit', ":hover": { borderColor: 'brown' } }}>
                    {
                      isMore300 ? ("Checkout") : ("300 Min Order!")
                    }
                  </Button>
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
