import { AppBar, Avatar, Badge, Box, Button, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import LeftDrawer from './LeftDrawer'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.png'
import textlogowhite from '../assets/Images/text_logo_white.jpg'



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
            {/* <Avatar
              alt='logo'
              src='https://img1.wsimg.com/isteam/ip/0feef9a5-f7be-48d5-b948-d2fcb2003283/manxho_%20transparent%20logo%202021-01.png/:/rs=w:320,h:320,cg:true,m/cr=w:320,h:320/qt=q:95'
              sx={{width:60, height:80,pt:0.5, alignItems:'left'}}
            /> */}
            {/* <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, ml:1, fontFamily:'Lato', fontWeight:900, color:'inherit'}}>Manxho</Typography> */}
            <Box component='img' onClick={()=>navigate('/')} src={textlogowhite} sx={{height:45, cursor:'pointer' }}/>
           
           <Avatar onClick={()=>navigate('/profile')}  sx={{ml:2, mr:2, marginLeft:'auto'}} />

            <IconButton onClick={()=>navigate('/cart')} sx={{}} >
                <Badge  badgeContent={4} color="primary">
                    <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                </Badge>
            </IconButton>
           
            
            </>
        ):(
            <>
            {/* <Avatar
              alt='logo'
              src={textlogowhite}
              sx={{width:65, height:75,pt:0.5}}
            /> */}
           <Box component='img' onClick={()=>navigate('/')}  src={textlogowhite} sx={{height:50, m:2, cursor:'pointer'}}/>

            {/* <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, ml:1, fontFamily:'Lato', fontWeight:2000, color:'inherit'}}>
                
            </Typography> */}
            
            <Button onClick={()=>navigate('/menu')} size='large' color='inherit' sx={{marginLeft:'auto'}}>Menu</Button>
            <Button onClick={()=>navigate('/signin')} size='large' color='inherit'>Signin</Button>
            <Button onClick={()=>navigate('/signup')} size='large' color='inherit'>Signup</Button>

            <Avatar onClick={()=>navigate('/profile')} sx={{ml:2, mr:2}} />

            <IconButton onClick={()=>navigate('/cart')} sx={{justifyContent:'center'}} >
                 <Badge  badgeContent={4} color="primary">
                    <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                </Badge>
            </IconButton>
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