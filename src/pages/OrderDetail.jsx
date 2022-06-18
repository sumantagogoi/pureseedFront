import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import ProductContext from '../components/context/product/productcontext'
import { useState } from 'react'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import axios from 'axios'


const OrderDetail = () => {

    const {allOrdersByUser} = useContext(ProductContext)
    const {userLoginDetails} = useContext(AuthenticationContext)
   
    const params = useParams()

    const getOrderById = async ()=>{
        const response = await axios.get(`https://api.manxho.co.in/api/users/order/${params.orderId}`,{
            headers:{
                'content-type':'application/json',
                'Authorization': `Bearer ${userLoginDetails?.token}`
            }
        });
        console.log(response)
    }

    useEffect(()=>{
        getOrderById()
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