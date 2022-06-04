import { Card, CardActionArea, CardHeader, CardMedia, IconButton } from '@mui/material'
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
                        height='200'
                        image={`https://api.manxho.co.in/${item.image}`}
                    />
        </CardActionArea>   
                     <CardHeader
                    title={item.title}
                    subheader= {`Rs. ${item.price} / ${item.size}`}
                    action={
                        <IconButton onClick={()=>addtoCart(item)}>
                            <AddShoppingCartRoundedIcon sx={{fontSize:15}}/>
                        </IconButton>  
                    }
                    titleTypographyProps={{variant:'h6', fontFamily:'savoy'}}
                    sx={{backgroundColor: "#2a2a2a"}}
                />   
                </Card>
  )
}

export default Item