import { Avatar, Box, Button, capitalize, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, Link } from '@mui/material'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ProductContext from '../components/context/product/productcontext'
import { useState } from 'react'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import axios from 'axios'


const OrderDetail = () => {

  const { allOrdersByUser } = useContext(ProductContext)
  const { userLoginDetails } = useContext(AuthenticationContext)
  const [order, setOrder] = useState([])

  const params = useParams()

  const getOrderById = async () => {
    const { data } = await axios.get(`https://api.manxho.co.in/api/users/order/${params.orderId}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${userLoginDetails?.access_token}`
      }
    });
    setOrder(data)
  }

  useEffect(() => {
    getOrderById()
  }, [])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container sx={{ minHeight: '100vh', pt: 13, pb: 4 }}>

        <Typography align='center' variant='h4'>Order-{params.orderId}</Typography>

        <List>
          {order?.orderItems?.map((item) => (
            <ListItem key={item?._id}>
              <ListItemAvatar>
                <Avatar
                  src={`https://api.manxho.co.in${item?.image}`}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText sx={{ pl: 2 }}>{item?.name}</ListItemText>
              <Typography variant='body2'>{item?.qty} x {item?.price} &#8377; {Number(item?.price * item?.qty).toFixed(0)}</Typography>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText>Shipping:</ListItemText>
            <Typography variant='subtitle1'> &#8377;{order?.shippingPrice}</Typography>
          </ListItem>

          {order?.coupon !== ''}{
            <ListItem>
              <ListItemText>Coupon:</ListItemText>
              <Typography variant='subtitle1'>{order?.coupon}</Typography>
            </ListItem>
          }
          <ListItem>
            <ListItemText>Total:</ListItemText>
            <Typography variant='subtitle1'> &#8377;{order?.totalPrice}</Typography>
          </ListItem>

          {order.isPaid ? (
            <ListItem>
              <ListItemText>Payment Status:</ListItemText>
              <Typography variant='subtitle1'> Paid</Typography>
            </ListItem>
          ) : (<ListItem>
            <ListItemText>Payment Status:</ListItemText>
            <Typography variant='subtitle1'>Awaiting Payment Confirmation</Typography>
          </ListItem>)}

          {order.isDelivered ? (
            <ListItem>
              <ListItemText>Order Status:</ListItemText>
              <Typography variant='subtitle1'>Delivered</Typography>
            </ListItem>
          ) : (<ListItem>
            <ListItemText>Order Status:</ListItemText>
            <Typography variant='subtitle1' sx={{ textTransform: "capitalize" }}>{order?.status}</Typography>
          </ListItem>)}

          {order?.status == "dispatched" ? (
            <ListItem>
              <ListItemText>Courier details:</ListItemText>
              <Typography variant='subtitle1'>{order?.courierInfo}</Typography>
            </ListItem>
          ) : (<></>)}

        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' gutterBottom>Shipping Details</Typography>
            <Typography>{userLoginDetails?.first_name} {userLoginDetails?.last_name}</Typography>
            <Typography>{order?.shippingAddress?.address}</Typography>
            <Typography>{order?.shippingAddress?.city} - {order?.shippingAddress?.zipcode} </Typography>
            <Typography>{order?.shippingAddress?.state} - {order?.shippingAddress?.country}</Typography>
            <Typography>Phone:{order?.shippingAddress?.phone_number}</Typography>
          </Grid>

        </Grid>

        <Link href="https://wa.me/918134909910">
          <Button variant='outlined' fullWidth sx={{ mb: 4, mt: 2, borderColor: 'brown', color: 'inherit', ":hover": { borderColor: 'brown' } }}>Support</Button>
        </Link>
        
      </Container>
    </motion.div>
  )
}

export default OrderDetail