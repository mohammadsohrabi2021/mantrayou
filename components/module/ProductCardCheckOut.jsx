import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import baseImage from "../../assets/images/mantra.png";
import Image from "next/image";
import { colorVariations } from "@/Data/DataColor";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { addProductToCartAPI, removeProductFromCartAPI } from "@/pages/api/cart/cartApi";
import { handleRemoveItem } from "@/utils/cartUtils";
import { updateCartQuantityMethod } from "@/redux/appSlice";
import { fetchData } from "@/utils/fetchDataCheckOut";

function ProductCardCheckOut({ main_image, name, price, product_id, quantity: initialQuantity, variation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart); // سبد خرید از استور گرفته می‌شود
  const [quantity, setQuantity] = useState(initialQuantity); // مقدار اولیه از props گرفته می‌شود
  const [loading, setLoading] = useState(false); // وضعیت لودینگ

  const handleUpdateQuantity = async (id, variation, newQuantity) => {
    const token = Cookies.get('token');
    setLoading(true);
    if (newQuantity <= 0) {
      await handleRemoveItem(dispatch, id, variation, 1);
      fetchData(dispatch, setLoading);
    } else {
      try {
        let response;
        const currentQuantity = cart.find(item => item.id === id && item.variation.color === variation.color)?.quantity;
        if (newQuantity > currentQuantity) {
          response = await addProductToCartAPI(token, { id, variation, quantity: 1 });
        } else {
          response = await removeProductFromCartAPI(token, { id, variation, count: 1 });
        }
        setQuantity(newQuantity); // به‌روزرسانی state محلی
        fetchData(dispatch, setLoading);
        dispatch(updateCartQuantityMethod({ id, variation, quantity: newQuantity }));
      } catch (error) {
        console.error("Failed to update product quantity:", error);
      }
    }
    setLoading(false); // پایان لودینگ
  };

  return (
    <Box px={2}>
      <Image
        width={125}
        height={90}
        src={
          main_image
            ? `https://api.mantrayou.com/images/${main_image}`
            : baseImage
        }
        alt="imageSite"
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        border={"1px solid #e0e0e2"}
        borderRadius={'8px'}
      >
        <IconButton color="primary" onClick={() => handleUpdateQuantity(product_id, variation, quantity + 1)} disabled={loading}>
          <AddIcon />
        </IconButton>
        <Typography variant="body1">{quantity}</Typography>
        <IconButton color="error" onClick={() => handleUpdateQuantity(product_id, variation, quantity - 1)} disabled={loading}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box display={"flex"} pt={1} gap={1}>
        <Box
          sx={{
            width: 15,
            height: 15,
            bgcolor: colorVariations[variation.color],
            borderRadius: "50%",
            display: "inline-block",
            border: variation.color && "1px solid gray",
          }}
        />
        <Typography fontFamily={"iran-sans"} fontSize={'10px'} color="textSecondary">
          {variation.color}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductCardCheckOut;
