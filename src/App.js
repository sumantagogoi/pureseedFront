
import {BrowserRouter} from 'react-router-dom'
import ResponsiveHeader from './components/ResponsiveHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Paper } from '@mui/material';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import AlertToast from './components/AlertToast';
import AnimatedRoutes from './components/AnimatedRoutes';






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
    
      <AnimatedRoutes/>
    
     </BrowserRouter>
     <AlertToast/>
     </Paper>
     </ThemeProvider>
     
    </>
   
  );
}

export default App;
