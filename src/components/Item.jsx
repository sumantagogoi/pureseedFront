import { Button, Card, CardActionArea, CardActions, CardHeader, CardMedia, IconButton } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import React from 'react'
import ProductContext from './context/product/productcontext';
import { useContext } from 'react';

const Item = ({item}) => {
    const {addtoCart} = useContext(ProductContext)
    
  return (
    <Card  sx={{maxWidth:300}}>
        <CardActionArea>
                    <CardMedia
                        component='img'
                        height='160'
                        image={`https://api.manxho.co.in/${item.image}`}
                        sx={{objectFit:'contain'}}
                    />
        </CardActionArea>   
                     <CardHeader
                    title={item.title}
                    subheader= {`Rs. ${item.price} / ${item.size}`}
                    // action={
                    //     <IconButton onClick={()=>addtoCart(item)}>
                    //         <AddShoppingCartRoundedIcon />
                    //     </IconButton>  
                    // }
                    titleTypographyProps={{variant:'h6', fontFamily:'savoy'}}
                    sx={{backgroundColor: "#2a2a2a", textAlign:'center'}}
                />  
                <CardActions>
                    <Button onClick={()=>addtoCart(item)} fullWidth variant='contained' startIcon={<AddShoppingCartRoundedIcon/>} sx={{bgcolor:'inherit',color:'inherit',":hover":{bgcolor:'brown', color:'white'}}}>Add to Cart</Button>
                    </CardActions>
                </Card>
  )
}

export default Item