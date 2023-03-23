import { AppBar, Avatar, Badge, Box, Button, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import LeftDrawer from './LeftDrawer'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.png'
import textlogowhite from '../assets/Images/manxho-logo-tm.png'
import AuthenticationContext from './context/authentication_context/AuthenticationContext';
import ProductContext from './context/product/productcontext';
import { useContext } from 'react';
import CartItem from '../pages/CartItem';
import CartDrawer from './CartDrawer';



const theme = createTheme({
   palette: {
       dark:{
           main:'#212121'
       }
   } 
});

const ResponsiveHeader = () => {
    const [open, setOpen] = useState(false)
    const [showCart, setShowCart] = useState(false)
    
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()

    const {userLoginDetails, Logout} = useContext(AuthenticationContext)
    const {cartItems} = useContext(ProductContext)
    const totalItemInCart = cartItems?.length 

    const logoutHandler = ()=>{
        Logout()
        navigate('/')
    }
  


  return (
      <>
        <AppBar color='inherit' position="fixed">
        <Toolbar >

        {matches ? (
            <>
            <IconButton onClick={()=>setOpen(!open)}>
                <MenuIcon/>
            </IconButton>
            <Box sx={{ml:'auto', display:'flex', flexDirection:'column',}}>
                <Box component='img' onClick={()=>window.location ='https://pureseed.in'} src={textlogowhite} sx={{height:45, cursor:'pointer' }}/>
                <Typography onClick={()=>navigate('/')} variant='h4' align='center' sx={{ flexGrow:1, fontFamily:'Lato', fontSize:13, mb:1, color:'inherit'}}>
                Local . Hygienic . Fresh
                 </Typography>
            </Box>
               
            <IconButton onClick={()=>setShowCart(!showCart)} sx={{marginLeft:'auto'}} >
                <Badge  badgeContent={totalItemInCart} color="primary">
                    <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                </Badge>
            </IconButton>
           
            
            </>
        ):(
            <>
           
           <Box component='img' onClick={()=>window.location ='https://pureseed.in'}  src={textlogowhite} sx={{height:50, m:2, cursor:'pointer'}}/>

            <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, fontFamily:'Lato', fontSize:20, color:'inherit'}}>
                Local . Hygienic . Fresh
            </Typography>
            
            <Button onClick={()=>navigate('/')} size='large' color='inherit' sx={{marginLeft:'auto'}}>Home</Button>
            
            {userLoginDetails ? (<>
                <Button onClick={logoutHandler} size='large' color='inherit'>Logout</Button>
                <Avatar onClick={()=>navigate('/profile')} sx={{ml:2, mr:2}} />
                 <IconButton onClick={()=>setShowCart(!showCart)} sx={{justifyContent:'center'}} >
                    <Badge  badgeContent={totalItemInCart} color="primary">
                        <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                    </Badge>
                </IconButton>
            </>) : (
                <>
                 <Button onClick={()=>navigate('/signin')} size='large' color='inherit'>Sign in</Button>
                <Button onClick={()=>navigate('/signup')} size='large' color='inherit'>Sign up</Button>
                <IconButton onClick={()=>setShowCart(!showCart)} sx={{justifyContent:'center'}} >
                    <Badge  badgeContent={totalItemInCart} color="primary">
                        <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                    </Badge>
                </IconButton>
                </>
            ) }
           
            </>
        )}
        </Toolbar>
        <LeftDrawer open={open} setOpen={setOpen}/>
        <CartDrawer showCart={showCart} setShowCart={setShowCart} />
        
       
    </AppBar>
    </>
  )
}

export default ResponsiveHeader