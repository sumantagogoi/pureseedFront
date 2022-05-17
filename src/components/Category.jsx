import { Box, Button, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const Category = () => {
    return (
         <Paper>
        <Box sx={{flexGrow:1, mt:12, borderBottom:1, borderBottomColor:'divider'}}>
            <Typography sx={{mb:3, textAlign:'center'}} variant='h4' component='h5'>Category</Typography>
       <Grid container spacing={2}>
           <Grid item xs={6} md={4} lg={3}>
                <Card sx={{maxWidth:345}}>
                    <CardMedia 
                    component='img'
                     height='230'
                     image='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                     
                     />
                     <CardContent> 
                        <Typography variant='h5' component='h5' sx={{textAlign:'center'}}>Smoked Meats</Typography>
                     </CardContent>
                </Card> 
           </Grid>
           <Grid item xs={6} md={4} lg={3} >
                <Card sx={{maxWidth:345}}>
                    <CardMedia 
                    component='img'
                     height='230'
                     image='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                     />
                      <CardContent> 
                        <Typography variant='h5' component='h5' sx={{textAlign:'center'}}>Ubmixed Natural Rice</Typography>
                     </CardContent>
                </Card> 
           </Grid>
           <Grid item xs={6} md={4} lg={3}>
                <Card sx={{maxWidth:345}}>
                    <CardMedia 
                    component='img'
                     height='230'
                     image='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                     />
                      <CardContent> 
                        <Typography variant='h5' component='h5' sx={{textAlign:'center'}}>Condiments</Typography>
                     </CardContent>
                </Card> 
           </Grid>
           <Grid item xs={6} md={4} lg={3}>
                <Card sx={{maxWidth:345}}>
                    <CardMedia 
                    component='img'
                     height='230'
                     image='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                     />
                      <CardContent> 
                        <Typography variant='h5' component='h5' sx={{textAlign:'center'}}>Ready To Eat</Typography>
                     </CardContent>
                </Card> 
           </Grid>
       </Grid>
       </Box>
       </Paper>
    );
}

export default Category;
