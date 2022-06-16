import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ProductContext from '../components/context/product/productcontext'
import { useState } from 'react'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';


const OrderDetail = () => {

    const {allOrdersByUser} = useContext(ProductContext)
    const [orderDetail, setOrderDetail] = useState()
    const params = useParams()
    
    const getSingleOrder = async ()=>{
        const data = await allOrdersByUser.filter((order)=>{
            return order._id == params.orderId  
        })
        setOrderDetail(data)
        console.log(data)
    }
    useEffect(()=>{ 
        getSingleOrder()   
    }, [])


  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
    <Container sx={{minHeight:'100vh',pt:13}}>
        <Typography align='center' variant='h4'>Order-{params.orderId}</Typography>
        <List>
           
                <ListItem>
                <ListItemAvatar>
                   
                </ListItemAvatar>
                <ListItemText></ListItemText>
                <Typography></Typography>
            </ListItem>
            
            
        </List>
    </Container>
    </motion.div>
  )
}

export default OrderDetail