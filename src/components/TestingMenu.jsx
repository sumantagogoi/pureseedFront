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


const SomeMenu = ({localProducts}) => {

    const {products} = useContext(ProductContext)


    
    
  return (
   <Box sx={{flexGrow:1, minHeight:'100vh'}}>
       <Typography sx={{pb:2, mt:3, textAlign:'center', fontFamily:'Roboto',}} variant='h4' component='h5'>MENU</Typography>
       <Grid container spacing={2}>

        {localProducts?.map((item)=>(
            <>
            <Grid item xs={6} md={4} lg={3} sx={{mb:2}}>
                <Item item={item} />     
           </Grid>
            </>
        ))} 
       </Grid>
   </Box>
  )
}

export default SomeMenu