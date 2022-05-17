import { AppBar, Avatar, Badge, Button, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import LeftDrawer from './LeftDrawer'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
            <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, ml:1, fontFamily:'Lato', fontWeight:900, color:'inherit', }}>Manxho</Typography>
            <Avatar onClick={()=>navigate('/profile')}  sx={{ml:2, mr:2}} />

            <IconButton onClick={()=>navigate('/cart')} sx={{justifyContent:'center'}} >
                 <Badge  badgeContent={4} color="primary">
                    <ShoppingCartIcon sx={{fontSize:'33px', }}/>
                </Badge>
            </IconButton>
            </>
        ):(
            <>
            <Typography onClick={()=>navigate('/')} variant='h4' sx={{ flexGrow:1, ml:4, fontFamily:'Lato', fontWeight:900, color:'inherit'}}>Manxho</Typography>
            <Button onClick={()=>navigate('/products')} size='large' color='inherit'>Product</Button>
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