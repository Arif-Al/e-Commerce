import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { addToCart } from "../Slices/cart/cartItems";
import { useDispatch } from "react-redux";
import PaginationMui from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import { Bounce, toast, ToastContainer } from "react-toastify";
import axiosClient from "../../Client/axios Intarsence";

const ProdectsCard = () => {
  const [filterCategorie, setFilterCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [isLoad, setLoad] = useState(true);
  const [categoryArr, setCategory] = useState([]);
  const [curruntPage, setCurruntPage] = useState(1);

  const itemPerPage = 10;
  const totalPage = Math.ceil(filterCategorie.length / itemPerPage);
  // console.log(Products, "products");

  const dispactch = useDispatch();

  const filterProducts = (categoryProduct) => {
    const filterCategory = categoryProduct
      ? Products.filter((item) => item.category === categoryProduct.value)
      : Products;

    setFilterCategories(filterCategory);
    // console.log(filterCategory, "filterCAtegory");
  };

  useEffect(() => {
    const ProduCards = axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        const categoryArr = data.data.map((item) => {
          return {
            label: item.category,
            value: item.category,
          };
        });

        const uniqueArr = categoryArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        );
        // console.log(categoryArr, "category");

        setCategory(uniqueArr);
        setProducts(data.data);
        setFilterCategories(data.data);
        setLoad(false);
      });
  }, []);

  const deleteProduct = (id) => {
    axiosClient.delete(`products/${id}`).then((response) => {
        if (response.status === 200) {
          toast.success('Product deleted successfully!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } 
      });
  };
  

   

  return (
   
    <div>
       <ToastContainer position="top-right" />
      <Box className="mt-5 ms-3">
        <Autocomplete
          disablePortal
          options={categoryArr}
          sx={{ width: 300 }}
          onChange={(e, newValue) => {
            filterProducts(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </Box>
      <Grid container spacing={2} className="mt-5">
        {isLoad ? (
          <Box className="my-5 w-100 text-center">
            <CircularProgress size="3rem" />
          </Box>
        ) : (
          filterCategorie
            .slice((curruntPage - 1) * itemPerPage, curruntPage * itemPerPage)
            ?.map((product) => (
              <Grid item sm={3}>
                <Card
                  style={{ maxWidth: "350px", minWidth: "280px" }}
                  key={product.id}
                  className="mx-3"
                >
                  <Swiper
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{
                      delay: 5500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide className="text-center">
                      <img
                        width={"200px"}
                        height={"250px"}
                        className=""
                        src={product.image} // Direct image URL from Fake Store API
                        alt={product.title}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="text-center">
                      <img
                        width={"200px"}
                        height={"250px"}
                        src={product.image} // Direct image URL from Fake Store API
                        alt={product.title}
                      />
                    </SwiperSlide>
                  </Swiper>
                  <Box className="text-start">
                    <Typography
                      variant="body2"
                      className="mt-2 text-start ms-2"
                    >
                      {product?.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="mt-2 text-start ms-2"
                      sx={{ cursor: "pointer" }}
                    >
                      <Tooltip title={product.title} placement="top">
                        {product?.title.length > 15
                          ? `${product?.title.slice(0, 15)}...`
                          : product?.title}
                      </Tooltip>
                    </Typography>
                    <Rating
                      className="ms-2"
                      name="read-only"
                      value={Math.round(product?.rating?.rate) || 0}
                      readOnly
                    />

                    <Box className="d-flex justify-content-between align-items-center bg-primary text-white">
                     <Box>
                     <Typography variant="h6" className="ms-2">
                        ${product?.price}
                      </Typography>
                     </Box>
                     <Box>

                   <Tooltip title="Delete" placement='top'>
                         <DeleteIcon className='text-white'  onClick={()=>deleteProduct(product?.id)} sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                      <Link to={`/ProductDetails/${product?.id}`}>
                        <Tooltip
                          sx={{ cursor: "pointer" }}
                          title="Details"
                          placement="top"
                        >
                          <InfoIcon className=" mx-2 text-white" />
                        </Tooltip>
                      </Link>
                      <Tooltip
                          sx={{ cursor: "pointer" }}
                          title="Add To Cart"
                          placement="top"
                        >
                      <Button
                        className="my-3 me-3"
                        variant="contained"
                        onClick={() => dispactch(addToCart(product))}
                      >
                        <AddIcon /> Add
                      </Button>
                      </Tooltip>
                     </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
        )}
      </Grid>
      <Box className=" d-flex justify-content-center my-2">
        <PaginationMui
          count={totalPage}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            setCurruntPage(value);
          }}
        />
      </Box>
    </div>
  );
};

export default ProdectsCard;
