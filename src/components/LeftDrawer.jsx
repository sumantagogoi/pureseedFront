import React from 'react'
import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';




function LeftDrawer({open, setOpen}) {
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
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
        <Box textAlign='center' sx={{mt:3}}>
            Manxho
        </Box>
        <Divider variant='middle' sx={{border:1}}/>
        <Box sx={{mt:2}}>
        <List>
          <ListItem button  >
              <ListItemText primary={'Profile'}/>
          </ListItem>
          <ListItem button  >
              <ListItemText primary={'Login'}/>
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