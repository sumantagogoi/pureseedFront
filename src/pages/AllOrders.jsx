import { Avatar, Container, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Divider } from '@mui/material'
import ProductContext from '../components/context/product/productcontext'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import {motion} from 'framer-motion'
import { useContext, useEffect } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import { Box, width } from '@mui/system'


import Moment from 'react-moment'
import 'moment-timezone';


const AllOrders = () => {
    const {getAllOrdersByUser, allOrders, loading} = useContext(ProductContext)
    const {userLoginDetails} = useContext(AuthenticationContext)

    const navigate=useNavigate()


    useEffect(()=>{
        if(!userLoginDetails){
            navigate(-1)
            toast.error('Login First')
        }else{
            getAllOrdersByUser(userLoginDetails?.token)
        }
    }, [])
  

  return loading ? <Loader/> : (
   <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   >
    <Container sx={{pt:12, minHeight:'100vh'}}>
        <Typography align='center' variant='h4' sx={{fontFamily:'Roboto'}}>All Orders</Typography>
        <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
             {allOrders?.map((order)=>(
                <Box key={order?._id} sx={{alignItems:'center'}}>
                    <List>
                        <ListItemButton  onClick={()=>navigate(`/order_detail/${order._id}`)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FactCheckRoundedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={order?._id} secondary= {`Status: ${order?.status}`} ></ListItemText>
                            <Moment  format="YYYY/MM/DD" date={order?.created_at} />
                        </ListItemButton>
                        
                    </List>
                </Box>
          ))}
           </Grid>
        </Grid>
    </Container>
   </motion.div>
  )
}

export default AllOrders