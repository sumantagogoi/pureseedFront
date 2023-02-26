import { Box, Button, Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import ProductContext from './context/product/productcontext';

import React, { useContext, useEffect } from 'react'
import './App.css';
import Item from './Item';
import Loader from './Loader';



const Menu = ({localProducts}) => {
    const {loading,setLoading} = useContext(ProductContext)

    useEffect (()=>{
        setLoading(false)
        
      }, [localProducts])
      
  return loading ? <Loader/> :  (
   <Box sx={{flexGrow:1, minHeight:'100vh'}}>
       <Typography sx={{pb:2, mt:3, textAlign:'center', fontFamily:'Roboto',}} variant='h4' component='h5'>MENU</Typography>
       <Grid container spacing={2}>

        {localProducts?.map((item)=> (
                <Grid  item xs={6} md={4} lg={3} sx={{mb:2}} key={item._id}>
                    <Item item={item}/>     
               </Grid>
            )
        )} 
       </Grid>
   </Box>
  )
}

export default Menu