import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProductContext from '../components/context/product/productcontext'

const FilteredMenu = () => {
  const {products} = useContext(ProductContext)
  const params = useParams()
  
  return (
    <Container>
      <Box sx={{flexFlow:1, height:'100vh', pt:12}}>
        <Typography variant='h3' sx={{textAlign:'center', mb:3}}>Category Name</Typography>
        <Grid container spacing={2}>
          
        </Grid>
      </Box>
    </Container>
  )
}

export default FilteredMenu