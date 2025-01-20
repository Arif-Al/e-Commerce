import { Box, Button, Rating, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add"
import Skeleton from '@mui/material/Skeleton';
import Skelton from "../SkeletonProductDetails/Skelton";
import { addToCart, cartItems } from "../Slices/cart/cartItems";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axiosClient from "../../Client/axios Intarsence";
 
const ProductDetails = () => {
  const [Product, setProduct] = useState([]);
  const [isLoding , setIsLododing] = useState(true)
  const { Product_id } = useParams();
  const [productdetail , setProductDetail] = useState({})
  const {cartItem} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  


  useEffect(() => {
    const ProduCards = axiosClient
      .get(`products/${Product_id}`)
      .then((data) => {
        setProduct(data.data);
        setIsLododing(false)
      });
  }, []);

  useEffect(() => {
    const renderProductDetail = cartItem?.filter((item)=> item?.id == Product_id) [0];
    setProductDetail(renderProductDetail)
  },[cartItem])

  const isExist = cartItem?.find(item => item.id == Product_id ) 


  return (
    <>
    <div className="container">
      {isLoding ?  <Skelton /> : 
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
                    <Box className="d-flex ">
                    <Typography variant="h6" className="">
                      $ {Product?.price}
                    </Typography>
                    {isExist && <Typography variant="h6" className="mx-3">
                      Qty: {productdetail?.quantity}
                    </Typography>}
                    </Box>
                   <Box>
                    <Button className="my-3 ms-3" variant="contained" onClick={() => dispatch(addToCart(Product))}>
                      <AddIcon /> Add
                    </Button>
                   </Box>
                  </Box>
          </div>
          
        </div>
       
      }
      </div>
      
    </>
  );
};

export default ProductDetails;
