import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../components/context/product/productcontext";
import Item from "../components/Item";
import Loader from "../components/Loader";

const FilteredMenu = () => {
  const { products } = useContext(ProductContext);
  const params = useParams();
  const catergoryProducts = products.filter(
    (product) => product.category == params.id
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  const getCategoryName = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://abdulrasid82.pythonanywhere.com/api/categories/"
    );
    setLoading(false);
    setData(data)
  };
  useEffect(() => {
    getCategoryName();
  }, []);
  const name = data.filter((cat)=>cat._id == params.id)

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Box sx={{ flexFlow: 1, height: "100vh", pt: 12 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 3, pt:2 }}>
          {name[0]?.title}
        </Typography>
        {catergoryProducts.length < 1 ? (
          <>
            <Typography sx={{ textAlign: "center" }} variant="h3">
              Sorry! No item is there!
            </Typography>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              {catergoryProducts?.map((product) => (
                <>
                  <Grid item xs={6} md={4} lg={3}>
                    <Item item={product} />
                  </Grid>
                </>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default FilteredMenu;
