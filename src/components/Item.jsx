import { Card, CardHeader, CardMedia, IconButton } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import React from 'react'

const Item = ({item}) => {
  return (
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
  )
}

export default Item