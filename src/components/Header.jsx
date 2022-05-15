import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar';
import { Button, FormControl, IconButton, InputAdornment, InputBase, InputLabel, Link, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LeftDrawer from './LeftDrawer'

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const CartHandler = ()=>{
        navigate('/cart')
    }
  return (
      <>
    <Toolbar sx={{borderBottom:0.5, borderColor:'divider'}}>

        {matches ? (<>
            <IconButton  onClick={()=>setOpen(!open)}>
            <MenuIcon/>
        </IconButton>
        <Typography
            component='h2'
            variant='h4'
            color='inherit'
            align='center'
            noWrap
            sx={{flex:1, fontFamily:'Lato', fontWeight:'bold'}}

 onClick={()=>navigate('/')}

        >Manxho</Typography>
        </>): (<>
            <Typography
            component='h2'
            variant='h4'
            color='inherit'
            align='left'
            noWrap
            sx={{flex:1, fontFamily:'Lato', fontWeight:'bold'}}
            onClick={()=>navigate('/')}
        >Manxho</Typography>
        </>)}
        
        
        {matches ? (
            <>
            <IconButton onClick={CartHandler}>
                 <Badge  badgeContent={4} color="primary">
                    <ShoppingBasketRoundedIcon/>
                </Badge>
            </IconButton>
            </>
        ) : (
            <>
                <Button onClick={()=>navigate('/signin')} variant='contained' sx={{ mr:2, bgcolor:'#6B2010', ":hover":{bgcolor:'#6B2010'}}}>Signin</Button>
            <Button onClick={()=>navigate('/signup')} variant='contained' sx={{bgcolor:'black', mr:2, ":hover":{bgcolor:'black'}}}>Signup</Button>
            <IconButton onClick={CartHandler}> 
            <Badge badgeContent={4} color="primary">
                <ShoppingBasketRoundedIcon/>
            </Badge>
            </IconButton>
            </>
        ) }
    </Toolbar> 
       <LeftDrawer open={open} setOpen={setOpen}/>
    </>

  )
}

export default Header
