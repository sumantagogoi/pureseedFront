import { Avatar, Box, Button, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import ProductContext from '../components/context/product/productcontext'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const base_url = process.env.REACT_APP_BASE_URL


const OrderReview = () => {
  const {cartItems, shippingDetails, dispatch} = useContext(ProductContext)
  const {userLoginDetails} = useContext(AuthenticationContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(cartItems.length < 1){
      navigate('/')
    }
   
  })

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

  return (
   <>
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
             <ListItemText>Subtotal:</ListItemText>
             <Typography variant='subtitle1'> &#8377;{cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0)}</Typography>
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
   </>
  )
}

export default OrderReview