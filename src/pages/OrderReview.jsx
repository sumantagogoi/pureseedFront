import { Avatar, Box, Button, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import ProductContext from '../components/context/product/productcontext'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {motion} from 'framer-motion'
import { useState } from 'react'

const base_url = process.env.REACT_APP_BASE_URL


const OrderReview = () => {
  const {cartItems, shippingDetails, dispatch} = useContext(ProductContext)
  const {userLoginDetails} = useContext(AuthenticationContext)
  
  const [couponCode, setCouponCode] = useState('')
  const [coupon, setCoupon] = useState([])
  const navigate = useNavigate()
  {if (cartItems?.length > 0){
    cartItems.cartTotalAmount = cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)
    if(coupon){
      const discount = coupon.discount
      const discounPrecentage = Number(discount / 100)
      cartItems.amountAfterDiscount = cartItems?.cartTotalAmount  - (cartItems?.cartTotalAmount * discounPrecentage)
     
    }
  }}
   

  useEffect(()=>{
    if(cartItems.length < 1){
      navigate('/')
    }
   
  }, [])

  

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      if(!userLoginDetails){
        navigate('/signin')
        toast.error('Kindly Login First')
       
      }else{
        const response = await axios.post('https://api.manxho.co.in/api/create_order/',{
          'orderItems':cartItems,
            'shippingAddress':shippingDetails,
            'totalPrice':cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)
        }, {
            headers:{
              'content-type':'application/json',
              'Authorization': `Bearer ${userLoginDetails?.token}`
            }
        })
        if(response.request.status === 200){
          navigate('/profile')
          toast.success('Order Successfully Created')
          dispatch({
            type:'CLEAR_CART'
          })

        }
      }
      
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const applyCoupon = async (e)=>{
    
    try {
      const data = await axios.post('http://127.0.0.1:8000/api/validate_coupon/', {"coupon_code":couponCode})
      console.log(data)
      if(data.request.status === 200){
        setCoupon(data.data)
        toast.success('Coupon Applied Successfully')
        
      }
    } catch (error) {
      toast.error('Invalid Coupon')
    }
  }

  const removeCoupon = ()=>{
    localStorage.removeItem('coupon')
  }

  return (
   <>
   <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   >
     <Container sx={{pt:12,minHeight:'100vh'}}>
       <Box>
         <Typography variant='h3' align='center'>Order Review</Typography>
       </Box>
       <Box>
         <List>
           {cartItems?.map((item)=>(
             <>
             <ListItem key={item._id}>
               <ListItemAvatar>
                <Avatar 
                src={`https://api.manxho.co.in${item.image}`}
                sx={{width:56, height:56}}
                />
               </ListItemAvatar>
               <ListItemText sx={{pl:2}}>{item.name}</ListItemText>
               <Typography variant='body2'>{item.qty} x {item.price} &#8377; {Number(item.price * item.qty).toFixed(0)}</Typography>
             </ListItem>
             </>
           ))}
           <Divider/>
           <ListItem>
           
             <ListItemText>Total:</ListItemText>
             <Typography variant='subtitle1'> &#8377;{cartItems?.cartTotalAmount}</Typography>
           </ListItem>
          { coupon < 1 ? '' : (
            <>
            <ListItem>
           
           <ListItemText>Discounted Amount:</ListItemText>
           <Typography variant='subtitle1'> &#8377;{cartItems?.amountAfterDiscount}</Typography>
         </ListItem>
            </>
          ) }

           <ListItem sx={{justifyContent:'flex-end'}}>
           <TextField
             label='Coupon'
             id='coupon'
             name='coupon'
             margin='normal'
             value={couponCode}
             onChange={(e)=>setCouponCode(e.target.value)}

             
             
             
             
             
             />
            {coupon < 1 ? (
              <>
              <Button onClick={()=>applyCoupon()} variant='outlined'  sx={{ml:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Apply</Button>
              </>
            ): (
              <>
                <Button onClick={()=>removeCoupon()} variant='outlined'  sx={{ml:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Remove</Button>
              </>
            )}
            

           </ListItem>
         </List>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' gutterBottom>Shipping</Typography>
            <Typography>{shippingDetails.firstName} {shippingDetails.lastName}</Typography>
            <Typography>{shippingDetails.address}</Typography>
            <Typography>{shippingDetails.city} - {shippingDetails.zipcode} </Typography> 
            <Typography>{shippingDetails.state} - {shippingDetails.country}</Typography>
          </Grid>

        </Grid>


         <Button onClick={handleSubmit} variant='outlined' fullWidth sx={{borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Pay Now</Button>
       </Box>

     </Container>
     </motion.div>
   </>
  )
}

export default OrderReview