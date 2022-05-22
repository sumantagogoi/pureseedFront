import { Box, Card, CardMedia, Container, Grid, Typography, CardContent, IconButton, Paper, Stack, Button, Divider } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import CartItem from './CartItem';
import { Items } from '../data';


let tempItem = Items.slice(0,5)


const Cart = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [IncreaseCartitem, setIncreaseCartitem] = useState(0)

  const increment = ()=>{
    setIncreaseCartitem((prev)=>prev +1)
  }
  const decrement = ()=>{
    setIncreaseCartitem((prev)=>prev -1)
  }


  return (
    <Container sx={{pt:12, pb:2, height:'100vh'}}>
      <Typography gutterBottom variant='h3'>Your Shopping Cart</Typography>
      <Grid container spacing={2}>
        {tempItem.map((item,index)=>(
         <>
         <Grid item xs={12} md={4}>
            <CartItem item={item} IncreaseCartitem={IncreaseCartitem} setIncreaseCartitem={setIncreaseCartitem}  />
         </Grid>
         </>
        ))}
      </Grid>
      <Divider sx={{border:1}}/>
      <Box sx={{display:'flex', mt:'7%', width:'100%', alignItems:'center', justifyContent:'space-between'}}>
        <Typography variant='h5'>Subtotal: &#8377; 24545</Typography>
        <Box>
          {matches ? (
            <>
            <Button sx={{ml:9, mb:2, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button>
            
            </>
          ):(
            <>
            <Button sx={{ml:9, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button>
            </>
          )}
          {/* <Button sx={{ml:9, minWidth:'150px', color:'inherit', bgcolor:'brown', ":hover":{bgcolor:'brown'}}} size='large'  type='button' variant='contained'>Empty</Button> */}
          <Button sx={{ml:9, minWidth:'150px'}} size='large'  type='button' variant='contained'>Checkout</Button>
        </Box>
      </Box>
      
    </Container>
  )
}

export default Cart