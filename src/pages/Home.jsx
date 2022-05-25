import { Container, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import Category from "../components/Category";
import ProductContext from "../components/context/product/productcontext";
import Loader from "../components/Loader";


import SomeMenu from "../components/SomeMenu";


const Home = () => {
  const {getCategories, loading, getProducts} = useContext(ProductContext)

  useEffect (()=>{
    getProducts()
    getCategories()
  }, [])

  return (

    loading ? (<Loader/>) : (
      <>  
      <Container sx={{height:'100vh'}}>
        <Category />
        <SomeMenu />
      </Container>
      </>
    )

  )
}

export default Home