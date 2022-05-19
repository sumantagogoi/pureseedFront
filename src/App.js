
import Home from './pages/Home'
import Products from './pages/Products'
import Signin from "./pages/Signin";
import Signup from './pages/Signup'
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart';
import ResponsiveHeader from './components/ResponsiveHeader';
import Profile from './pages/Profile';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Paper } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode:'dark',
  },
  
})



function App() {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Paper>
    <BrowserRouter>
    {/* <Header/> */}
    <ResponsiveHeader/>
      <Routes>
      
        <Route path='/' exact element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
     </BrowserRouter>
     </Paper>
     </ThemeProvider>
    </>
   
  );
}

export default App;

{/* <Header/> */}

        {/* <Container>
          <Category/>
          <Menu/>
        </Container> */}