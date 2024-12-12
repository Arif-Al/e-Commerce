import { Box, Drawer, Rating, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const DrawerItems = (props) => {
  const { openItems, toggleOpenItems } = props;

  const { cartItem } = useSelector((state) => state.cart);

  console.log(cartItem, "cartItem");

  return (
    <>
      <Drawer open={openItems} onClose={toggleOpenItems(false)}>
        <Box sx={{ width: "450px" }}>
          <Typography>cartItems</Typography>
          {cartItem?.map((item) => {
            return (
              <div className="d-flex align-items-center">
                <img width={100} className="m-3" src={item?.image} alt="" />
                <Box>
                  <Typography variant="body2">{item?.category}</Typography>
                  <Typography variant="h5">{item?.title}</Typography>
                  <Rating
                    className=""
                    name="read-only"
                    value={Math.round(item?.rating?.rate) || 0}
                    readOnly
                  />
                  <Box>
                    <Typography>{item?.price}</Typography>
                  </Box>
                </Box>
              </div>
            );
          })}
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerItems;
