import { Avatar, Box, Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import AuthenticationContext from '../components/context/authentication_context/AuthenticationContext'
import ProductContext from '../components/context/product/productcontext'
import {motion} from 'framer-motion'
import EditDetailsDialog from '../components/EditDetailsDialog'
import { useState } from 'react'
import UpdatePasswordDialog from '../components/UpdatePasswordDialog'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
const Profile = () => {
  const {userLoginDetails} = useContext(AuthenticationContext)
  const {loading, getAllOrdersByUser, allOrdersByUser} = useContext(ProductContext)
  const [openDialog, setOpenDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const navigate = useNavigate()




  useEffect(()=>{
    if(!userLoginDetails){
      return navigate('/signin')
    }else{
      getAllOrdersByUser(userLoginDetails?.token)
    }
  },[] )


  return loading ? <Loader/> :(
    <>
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity:0}}
      
      >
    <Container sx={{minHeight:'100vh'}}>
      <Box sx={{pt:11}}>
      {/* <Typography sx={{textAlign:'center'}} variant='h3'>Profile</Typography> */}
      <Box sx={{display:'flex', justifyContent:'center', pt:3}}>
        <Avatar
        src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-512%2Favatar-380-456332.png&f=1&nofb=1'
        sx={{height:100, width:100}}
        />
       
      </Box>
      <Divider sx={{mt:2}}/>

      <Box sx={{display:'flex', mt:3}}>
     
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6} >
        <Typography align='center' variant='h5' sx={{mb:2}}>User Deatils</Typography>
        <Container>
          <TextField 
          disabled
          label='First Name'
          value={userLoginDetails?.first_name}
          fullWidth
          margin='normal'
          />
          <TextField 
          disabled
          label='Last Name'
          value={userLoginDetails?.last_name}
          fullWidth
          margin='normal'
          />
          <TextField
          type='email'
          disabled
          label='Email '
          value={userLoginDetails?.email}
          fullWidth
          margin='normal'
          />

          <Box sx={{display:'flex',justifyContent:'space-between', mt:2}}>
          <Button  onClick={()=>setOpenDialog(true)} variant='outlined' fullWidth sx={{mr:1,color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Edit</Button>
          <Button onClick={()=>setOpenUpdateDialog(true)} variant='outlined' fullWidth sx={{ ml:1, color:'inherit', borderColor:'brown',  ":hover":{borderColor:'brown'}}}>Update Password</Button>

          </Box>
          
          {/* Dialog pop up for password update and edit details */}
          <EditDetailsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
          <UpdatePasswordDialog openUpdateDialog={openUpdateDialog} setOpenUpdateDialog={setOpenUpdateDialog} />
          
          
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
            <Typography variant='h5' align='center' sx={{mb:2}}>Recent Orders</Typography>
            {allOrdersByUser?.length < 1 ? (
              <>
              <Typography variant='h6' align='center'>Sorry No Orders Currently</Typography>
              <Grid container sx={{justifyContent:'center', mt:2}}>
              <Button onClick={()=>navigate('/')} variant='outlined' sx={{color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Shop Now</Button>
              </Grid>
             
              </>
            ):(
              <Container sx={{ mb:8}}>
            {allOrdersByUser?.map((order)=>(
              <Box key={order._id}>
              <List>
              <ListItem>
                <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                  <FactCheckRoundedIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={order?._id} secondary= {`Status: ${order?.status}`} ></ListItemText>
                <Typography>{order?.created_at}</Typography>
                </ListItemButton>
              </ListItem> 
            </List>
            <Divider/>
            </Box>
            ))}
            <Button  variant='outlined' fullWidth sx={{mt:2, color:'inherit', borderColor:'brown', ":hover":{borderColor:'brown'}}}>Show More</Button>
          </Container>
            ) }
            
            
        </Grid>
      </Grid>  
      </Box>  
      </Box>
    </Container>
    </motion.div>
    </>
  )
}

export default Profile