import { Box, Button, Card, CardContent, CardMedia, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';
import ProductContext from './context/product/productcontext';
import { CardActionArea } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TestingMenu from './TestingMenu'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme()



const Category = () => {
     const {categories, loading, products} = useContext(ProductContext) 
    
     const matches = useMediaQuery(theme.breakpoints.down('sm'));
     const navigate = useNavigate()
     const params = useParams()
     const cat = categories
     const [localProducts, setLocalProducts] = useState(products)

     const filterItem = (catid)=>{
          const updatedItems = products.filter((elem)=>{
              return elem.category === catid     
          })
          setLocalProducts(updatedItems)
       }
       
   
     
    return (
         <>
         <Paper>
        <Box sx={{flexGrow:1, pt:12, borderBottom:1, borderBottomColor:'divider'}}>
            <Typography sx={{mb:3, fontFamily:'Roboto',  textAlign:'center'}} variant='h4' component='h5'>CATEGORIES</Typography>
     <Swiper slidesPerView={3}>
       <Grid container spacing={2}>

        {cat?.map((category)=>(
             <>
             <SwiperSlide>
                <Grid  item xs={4} md={4} lg={3}>
                <Card key={category._id}  sx={{maxWidth:345}}>
                     <CardActionArea onClick={()=>filterItem(category._id)}>
                 <CardMedia 
                   component='img'
                    height='150'
                    image={`https://abdulrasid82.pythonanywhere.com/${category.image}`}
                    />
                    <CardContent> 
                       <Typography variant='h5' component='h5' sx={{textAlign:'center', fontFamily:'Roboto'}}>{category.title}</Typography>
                    </CardContent>
                    </CardActionArea>
               </Card> 
               </Grid> 
               </SwiperSlide>
             </>
        ))}
       </Grid>
       </Swiper>

       </Box>
       </Paper>
       <TestingMenu localProducts={localProducts}/>
       </>
    );
}

export default Category;
