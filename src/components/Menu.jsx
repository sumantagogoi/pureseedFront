import { Box, Button, Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'

import React from 'react'
import { Items } from '../data';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './App.css';
import Item from './Item';
import { useNavigate } from 'react-router-dom';
let newItems = Items.slice(0, 8)


const Menu = () => {
    const navigate = useNavigate()
    
  return (
   <Box sx={{flexGrow:1,mt:4, mb:2}}>
       <Typography sx={{mb:3, textAlign:'center'}} variant='h4' component='h5'>Menu</Typography>
       <Grid container spacing={2}>

        {newItems.map((item)=>(
            <>
            <Grid item xs={6} md={4} lg={3} sx={{mb:2}}>
                <Item item={item}/>     
           </Grid>
            </>
        ))} 
       </Grid>
       <Box onClick={()=>navigate('/products')} sx={{textAlign:'center', mt:2, mb:2}}>
         <Button variant='outlined' sx={{bgcolor:'brown', color:'white', ':hover':{bgcolor:'brown'}}}>Show All Items</Button>
       </Box>
       
   </Box>
  )
}

export default Menu