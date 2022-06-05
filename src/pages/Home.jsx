import { Container, Divider, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import CartDrawer from "../components/CartDrawer";
import Category from "../components/Category";
import ProductContext from "../components/context/product/productcontext";
import Loader from "../components/Loader";





const Home = () => {
  const {getCategories, loading, getProducts} = useContext(ProductContext)

  useEffect (()=>{
    getProducts()
    getCategories()
    
  }, [])

  return (

    loading ? (<Loader/>) : (
      <>  
      <Container sx={{minheight:'100vh'}}>
        <Category />
      </Container>
      
      
      </>
    )

  )
}

export default Home