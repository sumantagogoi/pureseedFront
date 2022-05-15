import { Box, Card, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import React from 'react'
import { Items } from '../data';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './App.css';
const styles = {
    ml:2,
}


const Menu = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
   <Box sx={{flexGrow:1,mt:4, mb:2}}>
       <Typography sx={{mb:3, textAlign:'center'}} variant='h4' component='h5'>Menu</Typography>
       <Grid container spacing={2}>

        {Items.map((item)=>(
            <>
            <Grid item xs={6} md={4} lg={3} sx={{mb:2}}>
                <Card sx={{maxWidth:300}}>
                    <CardMedia
                        component='img'
                        height='200'
                        image={item.img}

                    />
                     <CardHeader
                    title={item.title}
                    subheader= {`Rs. ${item.price} /Kg`}
                    action={
                        <IconButton>
                            <FavoriteBorderRoundedIcon/>
                        </IconButton>
                    }
                />     
                </Card>
           </Grid>
            </>
        ))} 
       </Grid>
   </Box>
  )
}

export default Menu