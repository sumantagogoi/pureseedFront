import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Item from '../components/Item';
import { Items } from '../data';

const Products = () => {
  return (
    <Container>
      <Box sx={{flexFlow:1, mt:14 }}>
        <Typography variant='h3' sx={{textAlign:'center', mb:3}}>Menus</Typography>
        <Grid container spacing={2}>
          {Items.map(item=>(
            <>
            <Grid item xs={6} md={4} lg={3}>
              <Item item={item}/>
            </Grid>
            </>
          ))}
         
        </Grid>
      </Box>
    </Container>
  )
}

export default Products