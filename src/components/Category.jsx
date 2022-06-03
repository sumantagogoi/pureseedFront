import { Box, Button, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import ProductContext from './context/product/productcontext';
import { CardActionArea } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
     const {categories, loading} = useContext(ProductContext) 
     // const result = products.map((product)=>product.category)
     const navigate = useNavigate()
     const params = useParams()
     const cat = categories
     

   
     
    return (
         <Paper>
        <Box sx={{flexGrow:1, pt:12, borderBottom:1, borderBottomColor:'divider'}}>
            <Typography sx={{mb:3, fontFamily:'Roboto',  textAlign:'center'}} variant='h4' component='h5'>CATEGORIES</Typography>
       <Grid container spacing={2}>

        {cat?.map((category)=>(
             <>
                <Grid  item xs={6} md={4} lg={3}>
                <Card key={category._id}  sx={{maxWidth:345}}>
                     <CardActionArea onClick={()=>navigate(`/cat/${category._id}`)}>
                 <CardMedia 
                   component='img'
                    height='230'
                    image={`https://abdulrasid82.pythonanywhere.com/${category.image}`}
                    />
                    <CardContent> 
                       <Typography variant='h5' component='h5' sx={{textAlign:'center', fontFamily:'Roboto'}}>{category.title}</Typography>
                    </CardContent>
                    </CardActionArea>
               </Card> 
               </Grid> 
             </>
        ))}
       </Grid>

       </Box>
       </Paper>
    );
}

export default Category;
