import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, IconButton, Typography, Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import emptyCartImage from "../../assets/images/shopCart.png";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantityMethod, removeFromCartMethod, setCartItems, saveCartInfoMethod } from "@/redux/appSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import baseImage from '../../assets/images/logoSite.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { colorVariations } from "@/Data/DataColor"; // Import color variations
import { showCartAPI, removeProductFromCartAPI } from "@/pages/api/cart/cartApi";
import Cookies from "js-cookie";

export const CartList = ({ toggleCartDrawer }) => {
  const FREE_SHIPPING_THRESHOLD = 100000; // مقدار هدف برای ارسال رایگان
  const cart = useSelector((state) => state.app.cart);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchCart = async () => {
      const token = Cookies.get('token');
      try {
        const cartData = await showCartAPI(token);
        console.log(cartData)
        const items = cartData.items.map(item => ({
          id: item.product_id,
          variation: item.variation,
          quantity: item.quantity,
          main_image: item.main_image,
          name: item.name,
          price: item.price,
          price_wd: item.price_wd,
        }));
        dispatch(saveCartInfoMethod(items));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setLoading(false);
      }
    };
    fetchCart();
  }, [dispatch]);

  const handleUpdateQuantity = async (id, variation, newQuantity) => {
    const token = Cookies.get('token');
    if (newQuantity === 0) {
      await handleRemoveItem(id, variation, 1);
    } else {
      dispatch(updateCartQuantityMethod({ id, variation, quantity: newQuantity }));
      try {
        await removeProductFromCartAPI(token, { id, variation, count: 1 });
      } catch (error) {
        console.error("Failed to update product quantity:", error);
      }
    }
  };

  const handleRemoveItem = async (id, variation, count) => {
    const token = Cookies.get('token');
    dispatch(removeFromCartMethod({ id, variation }));
    try {
      await removeProductFromCartAPI(token, { id, variation, count });
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  if (!mounted) {
    return <div style={{ width: 300, height: "100%", background: "#fff" }}>در حال بارگذاری...</div>;
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price_wd * item.quantity, 0);
  const progressPercentage = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  return (
    <Box
      role="presentation"
      onKeyDown={toggleCartDrawer(false)}
      sx={{
        width: {
          xs: 300, // برای صفحه نمایش کوچکتر از ۳۲۰ پیکسل
          sm: 400, // برای صفحه نمایش بزرگتر از ۳۲۰ پیکسل
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        textAlign: "center",
        "@media (min-width: 370px)": {
          width: 350, // برای صفحه نمایش بزرگتر از ۳۷۵ پیکسل
        },
        "@media (min-width: 425px)": {
          width: 400, // برای صفحه نمایش بزرگتر از ۳۷۵ پیکسل
        },
      }}
    >
      <Grid container alignItems="center" p={1}>
        <Grid
          item
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <IconButton onClick={toggleCartDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <Typography fontFamily={"iran-sans"} variant="h6">
            سبد خرید
          </Typography>
          <Grid />
        </Grid>
      </Grid>
      <Divider />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box p={2} display="flex" flexDirection="column" alignItems="center">
            {amountToFreeShipping > 0 ? (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                🚚 شما {amountToFreeShipping.toFixed(2)} یورو تا ارسال رایگان فاصله دارید
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                🎉 تبریک! شما به ارسال رایگان دست یافتید
              </Typography>
            )}
            <Box sx={{ width: "100%", bgcolor: "#f0f0f0", borderRadius: 5, mb: 2 }}>
              <Box sx={{ width: `${progressPercentage}%`, bgcolor: "green", height: 8, borderRadius: 5 }}></Box>
            </Box>
          </Box>
          <Divider />
          {cart.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              flexGrow={1}
            >
              <Image
                src={emptyCartImage}
                alt="سبد خرید شما خالی است"
                style={{ width: "150px", height: "150px", margin: "20px 0" }}
              />
              <Typography variant="body1" sx={{ fontFamily: "iran-sans" }}>
                سبد خرید شما خالی است
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
              flexGrow={1}
              p={2}
              sx={{ overflowY: "auto" }}
            >
              {cart.map((item) => (
                <Box key={`${item.id}-${item.variation?.color || ''}`} display="flex" width="100%" mb={1} height={'max-content'} borderRadius={'8px'} className={'box-shadow'} alignItems="center">
                  <Image
                    src={item.main_image ? `https://api.mantrayou.com/images/${item.main_image}` : baseImage}
                    alt={item.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <Box ml={2} display="flex" flexDirection="column" flexGrow={1}>
                    <Typography fontFamily={"iran-sans"} fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.price_wd} €
                    </Typography>
                    {item.variation?.color && (
                      <Box display="flex" alignItems="center" mt={1} gap={1}>
                        <Box
                          sx={{
                            width: 25,
                            height: 25,
                            bgcolor: colorVariations[item.variation.color],
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: 4,
                            border: '1px solid gray'
                          }}
                        />
                        <Typography fontFamily={'iran-sans'} color="textSecondary">
                          {item.variation.color}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" border={'1px solid lightGray'} borderRadius={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item.id, item.variation, item.quantity - 1)}
                    >
                      <RemoveIcon sx={{color:'red'}}/>
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      variant={'button'}
                      onClick={() => handleUpdateQuantity(item.id, item.variation, item.quantity + 1)}
                    >
                      <AddIcon sx={{color:'blue'}}/>
                    </IconButton>
                  </Box>
                  <Button
                    onClick={() => handleRemoveItem(item.id, item.variation, item.quantity)}
                    size="small"
                    sx={{ textTransform: "none", color: "red" }}
                  >
                    <DeleteIcon/>
                  </Button>
                </Box>
              ))}
            </Box>
          )}
          <Divider />
          <Box p={2}>
            <Typography variant="h6" fontFamily={"iran-sans"} fontWeight="bold">
              مجموع
            </Typography>
            <Typography variant="body2" color="textSecondary">
              هزینه ارسال در مرحله پرداخت محاسبه می‌شود
            </Typography>
            <Typography variant="h6" fontFamily={"iran-sans"} fontWeight="bold" sx={{ mt: 1 }}>
              {totalPrice.toFixed(2)} €
            </Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              ادامه خرید
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
