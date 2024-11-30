import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  TextField,
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

const ProdectsCard = () => {
  const [filterCategories , setFilterCategories] = useState()
  const [Products, setProducts] = useState([]);
  const [isLoad , setLoad] = useState(true)
  const [categoryArr , setCategory] = useState([])
  console.log(Products, "products");

  const filterProducts = (categoryProduct) => {
    const filterCategory = Products.filter((item) => item.category.name === categoryProduct.value)

    setFilterCategories(filterCategory)
    console.log(filterCategory , "filterCAtegory");
    
  }

  useEffect(() => {
    const ProduCards = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((data) => {
        const FilterData = data.data.filter(
          (Products) => Products.title !== "New Product"
        );

        const categoryArr = FilterData.map((item) => {
          return {
            label : item.category.name,
            value : item.category.name
          }
        }) 

        const uniqueArr = categoryArr.filter((item,index,self) => index === self.findIndex((t) => t.value === item.value)) 
        console.log(categoryArr ,  "category");
        
        setCategory(uniqueArr)
        setProducts(FilterData);
        setFilterCategories(FilterData);
        setLoad(false)
      

      });

      
  }, []);


  return (
    <>
      <Grid container spacing={3} className="mt-5 ms-5">
   <Box className="mt-5 ">
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
        { isLoad ? <Box className="my-5 w-100 text-center">
          <CircularProgress size="3rem" />
        </Box> :
        filterCategories?.map((product) => (
          <Grid item sm={2}>
            <Card key={product.id} className="text-center px-3 m-3 ">
              <Swiper
                spaceBetween={30}
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
                {product?.images.map((img) => {
                  return (
                    <SwiperSlide>
                      <img
                        src={img}
                        className="img-fluid"
                        alt={product.title}
                      />
                    </SwiperSlide>
                  );
                })}

                <SwiperSlide>
                  <img
                    src={product?.images[0]}
                    className="img-fluid"
                    alt={product.title}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={product?.images[0]}
                    className="img-fluid"
                    alt={product.title}
                  />
                </SwiperSlide>
              </Swiper>
              <Box className="text-start">
                <Typography variant="body2" className="mt-2 text-start">
                  {product?.category?.name}
                </Typography>
                <Typography variant="h6" className="mt-2 text-start">
                  {product?.title}
                </Typography>
                <Rating
                  name="read-only"
                  value={Math.round(product?.rating) || 0}
                  readOnly
                />
                <Typography variant="h6" className="tex">
                  ${product?.price}
                </Typography>
                <Button className="my-3" variant="contained">
                  <AddIcon /> Add
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProdectsCard;
