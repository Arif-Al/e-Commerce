import { Box, Button, Rating, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const ProductDetails = () => {
  const [Product, setProduct] = useState([]);

  const { Product_id } = useParams();

  useEffect(() => {
    const ProduCards = axios
      .get(`https://fakestoreapi.com/products/${Product_id}`)
      .then((data) => {
        setProduct(data.data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <img style={{maxWidth : "300px"}} src={Product?.image} alt="" />
          </div>
          <div className="col-md-6">
            <span>{Product?.category}</span>
            <h2>{Product?.title}</h2>
            <p>{Product?.description}</p>
            <Rating
              name="read-only"
              value={Math.round(Product?.rating?.rate)}
              readOnly
            />
              <Box className="d-flex justify-content-between align-items-center">
                    <Typography variant="h6" className="tex">
                      $ {Product?.price}
                    </Typography>
                   <Box>
                    <Button className="my-3 ms-3" variant="contained">
                      <AddIcon /> Add
                    </Button>
                   </Box>
                  </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
