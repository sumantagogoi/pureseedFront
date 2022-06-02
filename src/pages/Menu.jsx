import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import Item from '../components/Item';
import { Items } from '../data';
import ProductContext from '../components/context/product/productcontext';
import Loader from '../components/Loader';

const Menu = () => {
  const {products, loading} = useContext(ProductContext)
  return (
    <Container sx={{minheight:'100vh'}}>
      <Box sx={{flexFlow:1, pt:14 }}>
        <Typography variant='h3' sx={{textAlign:'center', mb:3}}>Menus</Typography>
        <Grid container spacing={2}>
          {products.map((product)=>(
            <>
            <Grid item xs={6} md={4} lg={3} key={product._id}>
              <Item item={product}  />
            </Grid>
            </>
          ))}
         
        </Grid>
      </Box>
    </Container>
  )
}

export default Menu