import { Box, Button, Drawer, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  DeleteItem,
  DicreaseQuantity,
  increaseQuantity,
} from "../Slices/cart/cartItems";
import DeleteIcon from "@mui/icons-material/Delete";
import { current } from "@reduxjs/toolkit";
const DrawerItems = (props) => {
  const { openItems, toggleOpenItems } = props;

  const { cartItem } = useSelector((state) => state.cart);
  const totalPrice = cartItem.reduce((acc , sum)=> sum.price * sum.quantity + acc , 0)

  // console.log(cartItem, "cartItem");
  const dispatch = useDispatch();

  return (
    <div>
      <Drawer open={openItems} onClose={toggleOpenItems(false)}>
        <Box className="container" width={"450px"} height={"100vh"}>
          <h3 className="bg-primary text-white text-center">Cart Items</h3>

          {cartItem?.map((item) => {
            return (
              <>
                <Box className="row align-items-center justify-content-center my-4 position-relative border-bottom pb-3 ">
                  <Box className="col-9 ">
                    <Box className="d-flex align-items-center">
                      <img
                        style={{ maxWidth: "100px", minWidth: "100px" }}
                        className=""
                        src={item?.image}
                        alt=""
                      />
                      <Box className="mx-3">
                        <Typography variant="body2">
                          {item?.category}
                        </Typography>
                        <Typography variant="h6" sx={{ cursor: "pointer" }}>
                          <Tooltip title={item.title} placement="top">
                            {item?.title.length > 15
                              ? `${item?.title.slice(0, 15)}...`
                              : item?.title}
                          </Tooltip>
                        </Typography>

                        <Box>
                          <Typography>
                            Price ${item?.price}
                            <span> Qty : {item?.quantity}</span>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-3">
                    <Box className="d-flex flex-column">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => dispatch(increaseQuantity(item))}
                      >
                        <ControlPointIcon />
                      </Button>
                      <Button
                        size="small"
                        className="my-2"
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(DicreaseQuantity(item))}
                      >
                        <RemoveCircleOutlineIcon />
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => dispatch(DeleteItem(item))}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            );
          })}
        
        </Box>
        <Button className="position-absolute bottom-0 my-4" fullWidth variant="contained">
            Total Price ${totalPrice}
          </Button>
      </Drawer>
    </div>
  );
};

export default DrawerItems;
