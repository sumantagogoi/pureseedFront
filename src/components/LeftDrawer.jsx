import React from 'react'
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'



function LeftDrawer({open, setOpen}) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const navigate = useNavigate()
  return (
    <>
    <SwipeableDrawer 
      PaperProps={{
        sx:{
          backgroundColor:'#6B2010',
          color:'white',
          borderRadius:'0px 100px 0 0'
          
        }
      }}
      anchor='left'
      open={open}
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      disableBackdropTransition={!iOS} 
      disableDiscovery={iOS}
      
    >
      <Box sx={{width:250}}>
        <Box textAlign='center' sx={{mt:3, mr:4}}>
           <Typography variant='h4'>Manxho</Typography>
        </Box>
        <Divider sx={{border:1}}/>
        <Box sx={{mt:2}}>
        <List>
          <ListItem button  >
              <ListItemText primary={'Profile'}/>
          </ListItem>
          <ListItem button  >
              <ListItemText primary={'Product'}/>
          </ListItem>
          <ListItem button onClick={()=>navigate('/signin')} >
              <ListItemText primary={'Singin'}/>
          </ListItem>
          <ListItem button >
              <ListItemText primary={'Logout'}/>
          </ListItem>
        </List>
        </Box>
      </Box>
    </SwipeableDrawer>
    </>
  )
}

export default LeftDrawer