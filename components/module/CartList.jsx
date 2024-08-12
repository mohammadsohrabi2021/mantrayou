import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, IconButton, Typography, Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import emptyCartImage from "../../assets/images/shopCart.png";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantityMethod, removeFromCartMethod, setCartItems, saveCartInfoMethod } from "@/redux/appSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import baseImage from '../../assets/images/mantra.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { colorVariations } from "@/Data/DataColor"; // Import color variations
import { showCartAPI, removeProductFromCartAPI, getFreeShippingThreshold, addProductToCartAPI } from "@/pages/api/cart/cartApi";
import Cookies from "js-cookie";
import Link from "next/link";

export const CartList = ({ toggleCartDrawer }) => {
  const cart = useSelector((state) => state.app.cart);
  const [loadingItems, setLoadingItems] = useState(() => {
    // Initialize state from localStorage
    const savedLoadingItems = localStorage.getItem('loadingItems');
    return savedLoadingItems ? JSON.parse(savedLoadingItems) : {};
  });
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(100000);

  useEffect(() => {
    setMounted(true);
    const fetchFreeShippingThreshold = async () => {
      const threshold = await getFreeShippingThreshold();
      if (threshold !== null) {
        setFreeShippingThreshold(threshold);
      }
    };
    const fetchCart = async () => {
      const token = Cookies.get('token');
      try {
        const cartData = await showCartAPI(token);
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
    fetchFreeShippingThreshold();
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    // Save loadingItems state to localStorage whenever it changes
    localStorage.setItem('loadingItems', JSON.stringify(loadingItems));
  }, [loadingItems]);

  const handleUpdateQuantity = async (id, variation, newQuantity) => {
    const token = Cookies.get('token');
    if (newQuantity <= 0) {
      await handleRemoveItem(id, variation, 1);
    } else {
      try {
        let response;
        if (newQuantity > cart.find(item => item.id === id && item.variation.color === variation.color).quantity) {
          response = await addProductToCartAPI(token, { id, variation, quantity: 1 });
          setLoadingItems(prev => ({ ...prev, [`${id}-${variation.color}`]: response?.new_item_total_quantity }));
        } else {
          response = await removeProductFromCartAPI(token, { id, variation, count: 1 });
          setLoadingItems(prev => ({ ...prev, [`${id}-${variation.color}`]: response?.new_item_total_quantity }));
        }
        dispatch(updateCartQuantityMethod({ id, variation, quantity: newQuantity }));
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
  const progressPercentage = Math.min((totalPrice / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - totalPrice, 0);
console.log(loadingItems)
  return (
    <Box
      role="presentation"
      onKeyDown={toggleCartDrawer(false)}
      sx={{
        width: {
          xs: 300,
          sm: 400,
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        textAlign: "center",
        "@media (min-width: 370px)": {
          width: 350,
        },
        "@media (min-width: 425px)": {
          width: 400,
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
                   <Grid display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                   <Typography>{item.quantity}</Typography>
                   <Typography fontFamily={'iran-sans'} fontSize={'12px'} color={'red'}>{loadingItems[`${item.id}-${item.variation.color}`] === 0 && "حداکثر"}</Typography>
                   </Grid>
                    <IconButton
                      size="small"
                      variant={'button'}
                      onClick={() => handleUpdateQuantity(item.id, item.variation, item.quantity + 1)}
                      disabled={loadingItems[`${item.id}-${item.variation.color}`] === 0}
                    >
                      <AddIcon sx={{color:loadingItems[`${item.id}-${item.variation.color}`] === 0 ? 'lightGray' : 'blue'}}/>
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
           <Link href={'/checkout'}>
           <Button   onClick={() => toggleCartDrawer(false)()} variant="contained"  fullWidth sx={{ mt: 2,height:'59px',backgroundColor:'#000',fontFamily:'iran-sans' }}>
              ادامه خرید
            </Button>
           </Link>
          </Box>
        </>
      )}
    </Box>
  );
};
