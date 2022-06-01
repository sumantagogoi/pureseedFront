import { Avatar, Box, Button, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import ProductContext from '../components/context/product/productcontext'
import { useContext } from 'react'

const base_url = process.env.REACT_APP_BASE_URL


const OrderReview = () => {
  const {cartItems} = useContext(ProductContext)
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
                src={`https://abdulrasid82.pythonanywhere.com/${item.image}`}
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
         <Button variant='outlined' fullWidth sx={{borderColor:'brown', color:'inherit', ":hover":{borderColor:'brown'}}}>Pay Now</Button>
       </Box>

     </Container>
   </>
  )
}

export default OrderReview