import { AppBar, Avatar, Badge, Box, Button, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import LeftDrawer from './LeftDrawer'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.png'
import textlogowhite from '../assets/Images/log.png'
import AuthenticationContext from './context/authentication_context/AuthenticationContext';
import { useContext } from 'react';



const theme = createTheme({
   palette: {
       dark:{
           main:'#212121'
       }
   } 
});

const ResponsiveHeader = () => {
    const [open, setOpen] = useState(false)
    const customTheme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()

    const {userLoginDetails, Logout} = useContext(AuthenticationContext)

    const logoutHandler = ()=>{
        Logout()
        navigate('/')
    }


  return (
      <>
      {/* <ThemeProvider theme={theme}> */}
      {/* <CssBaseline/> */}
        <AppBar color='inherit' position="fixed">
        <Toolbar >

        {matches ? (
            <>
            <IconButton onClick={()=>setOpen(!open)}>
                <MenuIcon/>
            </IconButton>
            
            <Box component='img' onClick={()=>navigate('/')} src={textlogowhite} sx={{height:45, cursor:'pointer' }}/>
        
            {userLoginDetails && (
                <>
                <Avatar onClick={()=>navigate('/profile')}  sx={{ml:2, mr:2, marginLeft:'auto'}} />
                </>
            )}
           
            <IconButton onClick={()=>navigate('/cart')} sx={{marginLeft:'auto'}} >
                <Badge  badgeContent={4} color="primary">
                    <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                </Badge>
            </IconButton>
           
            
            </>
        ):(
            <>
           
           <Box component='img' onClick={()=>navigate('/')}  src={textlogowhite} sx={{height:50, m:2, cursor:'pointer'}}/>

            <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, fontFamily:'Lato', fontSize:20, color:'inherit'}}>
                Local . Hygienic . Fresh
            </Typography>
            
            <Button onClick={()=>navigate('/menu')} size='large' color='inherit' sx={{marginLeft:'auto'}}>Menu</Button>
            
            {userLoginDetails ? (<>
                <Button onClick={logoutHandler} size='large' color='inherit'>Logout</Button>
                <Avatar onClick={()=>navigate('/profile')} sx={{ml:2, mr:2}} />
                 <IconButton onClick={()=>navigate('/cart')} sx={{justifyContent:'center'}} >
                    <Badge  badgeContent={4} color="primary">
                        <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                    </Badge>
                </IconButton>
            </>) : (
                <>
                 <Button onClick={()=>navigate('/signin')} size='large' color='inherit'>Signin</Button>
                <Button onClick={()=>navigate('/signup')} size='large' color='inherit'>Signup</Button>
                <IconButton onClick={()=>navigate('/cart')} sx={{justifyContent:'center'}} >
                    <Badge  badgeContent={4} color="primary">
                        <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                    </Badge>
                </IconButton>
                </>
            ) }
           
            </>
        )}
        </Toolbar>
        <LeftDrawer open={open} setOpen={setOpen}/>

    </AppBar>
    {/* </ThemeProvider> */}
    </>
  )
}

export default ResponsiveHeader