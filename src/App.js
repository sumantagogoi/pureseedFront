
import Home from './pages/Home'
import Products from './pages/Products'
import Sigin from "./pages/Sigin";
import Signup from './pages/Signup'
import Header from "./components/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart';




function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
      
        <Route path='/' exact element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/signin' element={<Sigin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
     </BrowserRouter>
    </>
   
  );
}

export default App;

{/* <Header/> */}

        {/* <Container>
          <Category/>
          <Menu/>
        </Container> */}