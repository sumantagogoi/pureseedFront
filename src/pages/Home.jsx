import { Container, Divider, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import CartDrawer from "../components/CartDrawer";
import Category from "../components/Category";
import ProductContext from "../components/context/product/productcontext";
import Loader from "../components/Loader";
import { motion } from "framer-motion";





const Home = () => {
  const {getCategories, loading, getProducts} = useContext(ProductContext)

  useEffect (()=>{
    getProducts()
    getCategories()
    
  }, [])

  return (

    loading ? (<Loader/>) : (
      <> 
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity:0}}
      
      >
      <Container sx={{minheight:'100vh'}}>
        <Category />
      </Container>
      </motion.div> 
      
      </>
    )

  )
}

export default Home