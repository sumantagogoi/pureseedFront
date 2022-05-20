import { Container, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import Category from "../components/Category";
import ProductContext from "../components/context/product/productcontext";

import Menu from "../components/Menu";


const Home = () => {
  const {products, loading, getProducts} = useContext(ProductContext)

  useEffect (()=>{
    getProducts()
  }, [])

  return (
      <>
   
    <Container>
        <Category/>
        <Menu/>
    </Container>
    </>
  )
}

export default Home