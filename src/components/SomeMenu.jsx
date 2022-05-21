import { Box, Button, Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'

import React from 'react'
import { Items } from '../data';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './App.css';
import Item from './Item';
import ProductContext from '../components/context/product/productcontext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


const SomeMenu = () => {
    const navigate = useNavigate()
    const {products} = useContext(ProductContext)
    let someProduct = products.slice(0,8)
    
  return (
   <Box sx={{flexGrow:1, pt:2, pb:10}}>
       <Typography sx={{pb:2, textAlign:'center'}} variant='h4' component='h5'>Menu</Typography>
       <Grid container spacing={2}>

        {someProduct.map((item)=>(
            <>
            <Grid item xs={6} md={4} lg={3} sx={{mb:2}}>
                <Item item={item} />     
           </Grid>
            </>
        ))} 
       </Grid>
       <Box onClick={()=>navigate('/menu')} sx={{textAlign:'center', mt:2}}>
         <Button variant='outlined' sx={{bgcolor:'brown', color:'white', ':hover':{bgcolor:'brown'}}}>Show All Items</Button>
       </Box>
       
   </Box>
  )
}

export default SomeMenu