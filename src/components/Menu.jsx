import { Box, Button, Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'

import React from 'react'
import './App.css';
import Item from './Item';



const Menu = ({localProducts}) => {
      
  return (
   <Box sx={{flexGrow:1, minHeight:'100vh'}}>
       <Typography sx={{pb:2, mt:3, textAlign:'center', fontFamily:'Roboto',}} variant='h4' component='h5'>MENU</Typography>
       <Grid container spacing={2}>

        {localProducts?.map((item)=>(
            <>
            <Grid key={item._id} item xs={6} md={4} lg={3} sx={{mb:2}}>
                <Item item={item}/>     
           </Grid>
            </>
        ))} 
       </Grid>
   </Box>
  )
}

export default Menu