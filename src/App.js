
import {BrowserRouter} from 'react-router-dom'
import ResponsiveHeader from './components/ResponsiveHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Paper } from '@mui/material';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import AlertToast from './components/AlertToast';
import AnimatedRoutes from './components/AnimatedRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';



const darkTheme = createTheme({
  palette: {
    mode:'dark',
  },
  
})



function App() {
  return (
    <>
    <GoogleOAuthProvider clientId="60129324500-acmj7o0bujlmlvuo4uq7n4a6nnmlbm19.apps.Pureseedcontent.com">
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
     </GoogleOAuthProvider>
    </>
   
  );
}

export default App;
