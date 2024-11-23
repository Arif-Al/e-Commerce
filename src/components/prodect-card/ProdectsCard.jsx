import { Box, Button, Card, Grid, Rating, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdectsCard = () => {
  const [Products, setProducts] = useState([]); // Initialize as an array

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Grid container>
      {Products.map((product) => (
        <Grid item sm={2} >
          <Card key={product.id} className="text-center px-3 m-3 ">
          <img  src={product?.images[0]} className='img-fluid' alt={product.title}  />
         <Box className="text-start">
         <Typography variant="h5" className="mt-2 text-start">{product?.title}</Typography>
          <Rating name="read-only" value={Math.round(product?.rating) || 0} readOnly /> 
          <Typography variant="h6" className='tex'>${product.price}</Typography>
          <Button className="my-3" variant="contained">
            <AddIcon /> Add
          </Button>
         </Box>
        </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProdectsCard;
