
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
import PaymentDialog from '../components/PaymentDialog'

const base_url = process.env.REACT_APP_BASE_URL


const OrderReview = () => {

  const getAssamDeliveryCharge = (tweight)=>{
    const weightInKg = tweight / 1000;
    if(weightInKg < 1){
      return 90
    }
    const roundedWeight = Math.floor(weightInKg); 
    return roundedWeight * 90
}


    const getWithinIndiaDeliveryCharge = (tweight)=>{
      const weightInKg = tweight / 960
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
       case "ASSAM":{
        return getAssamDeliveryCharge(tweight)
       }
       default:
        return getWithinIndiaDeliveryCharge(tweight)
         
      }
   }


  const {cartItems, shippingDetails, dispatch, shippingValue, coupon, setCoupon,updateOrder, setOpenPaymentModal, setOrderTotalAmount, setOrderId} = useContext(ProductContext)
  const {userLoginDetails} = useContext(AuthenticationContext)
  
  const [couponCode, setCouponCode] = useState('')
  
  const navigate = useNavigate()
  
  if (cartItems?.length > 0){
    cartItems.subTotal = cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)
    cartItems.totalWeight = cartItems.reduce((acc, item)=> acc + item.qty * Number( item.weight), 0)
    cartItems.shippingPrice = shipping_price(cartItems?.totalWeight, shippingValue)
    cartItems.totalPrice = cartItems?.subTotal + cartItems?.shippingPrice

    
    if(Object.keys(coupon).length > 0){
      const discount = coupon.discount
      const discountType = coupon.discount_type
      const discounPrecentage = Number(discount / 100)
      var  amountAfterDiscount = Math.ceil(cartItems?.totalPrice  - (cartItems?.totalPrice * discounPrecentage))
      cartItems.discountedAmount = Number(cartItems?.totalPrice) - Number(amountAfterDiscount)
     
    }
  }
   
  console.log(coupon.discount)
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
            'shippingPrice':cartItems?.shippingPrice,
            'coupon':Object.keys(coupon).length > 0 ? coupon.code : '',
            'totalPrice': Object.keys(coupon).length > 0 ? amountAfterDiscount : cartItems?.totalPrice

        }, {
            headers:{
              'content-type':'application/json',
              'Authorization': `Bearer ${userLoginDetails?.access_token}`
            }
        })
        if(response.request.status === 200){
          console.log(response.data)
          const orderID = `${response?.data?._id}`
          const totalAmount = response?.data?.totalPrice
          setOrderTotalAmount(totalAmount)
          setOrderId(orderID)
          setOpenPaymentModal(true)
          // displayRazorpay(orderID,totalAmount)
          // navigate('/profile')
          // toast.success('Order Successfully Created')
          // dispatch({
          //   type:'CLEAR_CART'
          // })
          // setCoupon([])

        }
      }
      
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error);
    }
  }

  const applyCoupon = async (e)=>{
    
    try {
      const data = await axios.post('https://api.manxho.co.in/api/validate_coupon/', {"coupon_code":couponCode})
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
    setCoupon('')
    
    toast.success('Coupon Removed Successfully!')
  }


const loadScript = (url)=>{
      return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = url
      script.onload = ()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
}

  const displayRazorpay = async (orderID,totalAmount)=>{
    const response = await loadScript(`https://checkout.razorpay.com/v1/checkout.js`)

    if (!response){
      toast.error('Something Went Wrong....')
      return 
    }

    const options ={
      key:"rzp_live_pTJJDu6eDHbg2w",
      currency:"INR",
      amount : totalAmount *100,
      name:"Manxho",
      description : "Thanks For Purchasing From Manxho",
  
      
      handler:function(response){
        if(response.razorpay_payment_id){
          updateOrder(orderID, response.razorpay_payment_id, userLoginDetails?.access_token)
          navigate('/profile')
          toast.success('Order Successfully Created')
          dispatch({
            type:'CLEAR_CART'
          })
          setCoupon([])
        }

      },
      prefill:{
        name:`${userLoginDetails?.first_name} ${userLoginDetails?.last_name}`,
        email:`${userLoginDetails?.email}`,
        contact:`${shippingDetails?.phoneNumber}`
      }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
   <>
   <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   >
     <Container sx={{pt:12, minHeight:'100vh'}}>
       <Box>
         <Typography variant='h3' align='center'>Order Review</Typography>
       </Box>
       <Box>
         <List>
           {cartItems?.map((item)=>(
           
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
            
           ))}
           <Divider/>
           <ListItem>
             <ListItemText>Sub-Total:</ListItemText>
             <Typography variant='subtitle1'> &#8377;{cartItems?.subTotal}</Typography>
           </ListItem>
           <ListItem>
             <ListItemText>Total Weight:</ListItemText>
             <Typography variant='subtitle1'>{cartItems?.totalWeight / 1000 } &#13199;</Typography>
           </ListItem>

           <ListItem>
             <ListItemText>Shipping:</ListItemText>
             <Typography variant='subtitle1'> &#8377;{cartItems?.shippingPrice}</Typography>
             {/* <Typography variant='subtitle1'> &#8377; {}</Typography> */}
           </ListItem>

          { Object.keys(coupon).length > 0 ? (
            <ListItem>
            <ListItemText>Discount:</ListItemText>
            <Typography variant='subtitle1'> &#8377;{cartItems?.discountedAmount}</Typography>
          </ListItem>
          ):('')}


           <ListItem>
             <ListItemText>Total:</ListItemText>
             <Typography variant='subtitle1'> &#8377;{amountAfterDiscount > 0 ? amountAfterDiscount : cartItems?.totalPrice}</Typography>
           </ListItem>
        
           <ListItem sx={{justifyContent:'flex-end'}}>
            <Typography sx={{mr: 2, fontSize: 13}}>Use Coupon MANXHO for 3% Discount!</Typography>
           <TextField
             label='Coupon'
             id='coupon'
             name='coupon'
             margin='normal'
             value={Object.keys(coupon).length > 0 ? coupon.code : couponCode}
             onChange={(e)=>setCouponCode(e.target.value)}  
             disabled = {Object.keys(coupon).length > 0 ? true : false}  
             />

          {Object.keys(coupon).length > 0 ? (
              <Button onClick={()=>removeCoupon()} variant='outlined'  sx={{ml:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Remove</Button>
          ):(
            <Button onClick={()=>applyCoupon()} variant='outlined'  sx={{ml:2, borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Apply</Button>
          )}
          
           </ListItem>
         </List>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' gutterBottom>Shipping</Typography>
            <Typography>{shippingDetails.firstName} {shippingDetails.lastName}</Typography>
            <Typography>{shippingDetails.address}</Typography>
            <Typography>{shippingDetails.city} - {shippingDetails.zipcode} </Typography> 
            <Typography>{shippingDetails.stateValue} - {shippingDetails.country}</Typography>
             <Typography>Phone: {shippingDetails.phoneNumber}</Typography>
          </Grid>
        </Grid>

        {cartItems?.totalWeight / 1000 > 8 ? (
          <Typography variant='h4' align='center' sx={{pt:3, pb:5}}>Sorry, we dont deliver product more than 8 Kg </Typography>
        ) :(
          <>
          <Button onClick={handleSubmit} variant='outlined' fullWidth sx={{mb:4, mt:2,borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Place Order</Button>
          {
          /* <Button onClick={displayRazorpay} variant='outlined' fullWidth sx={{mb:4, mt:2,borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Buy Now</Button> */
          }
          </>
        ) }
        
       </Box>
     </Container>
     </motion.div>
     <PaymentDialog/>
   </>
  )
}

export default OrderReview