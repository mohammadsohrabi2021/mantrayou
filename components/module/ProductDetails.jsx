import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import baseImage from "../../assets/images/mantra.png";
import ColorSelector from "./ColorSelector"; // Import the ColorSelector component
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { handleAddToCart, handleUpdateQuantity } from "@/utils/cartUtils";
import { checkProductStock } from "@/utils/inventoryUtils";
import Loader from "../icons/Loader";
import { setCartDrawerOpen } from "@/redux/appSlice";

const ProductDetails = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stock, setStock] = useState(product?.total_quantity);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const [mounted, setMounted] = useState(false);
  const thumbnailRef = useRef(null);
  const selectedImage = product?.images[selectedImageIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      scrollToThumbnail(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    if (selectedColor) {
      const variation = product.variations.find(
        (v) => v.color === selectedColor
      );
      setStock(variation ? variation.quantity : 0);
    } else {
      setStock(product?.total_quantity);
    }
    setErrorMessage("");
    setQuantity(1);
  }, [selectedColor, product]);

  useEffect(() => {
    const productInCart = cart?.find(
      (item) =>
        item?.id === product?._id &&
        (!item?.variation || item?.variation?.color === selectedColor)
    );
    if (productInCart) {
      setQuantity(productInCart.quantity);
    }
  }, [cart, product?._id, selectedColor]);

  const handleAddToCartClick = async () => {
    const result = checkProductStock(
      product,
      quantity,
      selectedColor ? { color: selectedColor } : null
    );

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }
    else{
      setErrorMessage('');
    }
    
    setLoading(true);
    setLoadingQuantity(true);
    console.log(quantity)
    const productToAdd = {
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      price_wd: product.price_wd,
      variation: selectedColor ? { color: selectedColor } : {},
      main_image: product.main_image,
      quantity,
    };

    const variation = product.has_variations ? { color: selectedColor } : {};
    await handleAddToCart(dispatch, productToAdd, variation);
    setStock(stock - quantity); // به‌روزرسانی موجودی بعد از اضافه کردن به سبد خرید
    setLoading(false);
    setLoadingQuantity(false);
    dispatch(setCartDrawerOpen(true)); 
  };

  const handleUpdateQuantityClick = async (product, newQuantity) => {
    console.log(product, newQuantity)
    const result = checkProductStock(
      product,
      newQuantity,
      selectedColor ? { color: selectedColor } : null
    );

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }
    else{
      setErrorMessage('');
    }

    setLoadingQuantity(true);
    const productInCart = cart.find(
      (item) => {
        if (product.has_variations) {
          return item.id === product._id && item.variation && item.variation.color === selectedColor;
        } else {
          return item.id === product._id || !item.variation;
        }
      }
    );
    const currentQuantity = productInCart ? productInCart.quantity : 0;
    await handleUpdateQuantity(
      dispatch,
      { ...product, quantity: currentQuantity },
      newQuantity
    );
    setStock(stock - (newQuantity - currentQuantity)); // به‌روزرسانی موجودی بعد از تغییر تعداد
    setLoadingQuantity(false);
    dispatch(setCartDrawerOpen(true)); 
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1;
      scrollToThumbnail(newIndex);
      return newIndex;
    });
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex =
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1;
      scrollToThumbnail(newIndex);
      return newIndex;
    });
  };

  const scrollToThumbnail = (index) => {
    const thumbnailList = thumbnailRef.current;
    if (thumbnailList) {
      const thumbnail = thumbnailList?.children[index];
      const offset =
        thumbnail?.offsetLeft -
        thumbnailList?.offsetWidth / 2 +
        thumbnail?.offsetWidth / 2;
      thumbnailList.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const productInCart = cart.find(
    (item) => {
      if (product?.has_variations) {
        return item?.id === product?._id && item?.variation && item?.variation?.color === selectedColor;
      } else {
        return item?.id === product?._id || !item?.variation;
      }
    }
  );

  if (!mounted) {
    return null;
  }

  return (
    <Grid
      my={4}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row-reverse" }}
      justifyContent={"space-between"}
      alignItems={{ md: "center" }}
      width={"100%"}
    >
      <Grid item xs={12} sm={4} md={4}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={2}
          alignItems="center"
          position="relative"
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: 500 },
              height: { xs: 250, sm: 350, md: 500 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={
                selectedImage !== undefined
                  ? `https://api.mantrayou.com/images/${selectedImage}`
                  : `${baseImage?.src}`
              }
              alt={product?.name || "Product Image"}
              layout="fill"
              objectFit="contain"
              quality={100}
              style={{ marginBottom: "16px" }}
            />
            <IconButton
              onClick={handlePreviousImage}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Box
            ref={thumbnailRef}
            display="flex"
            flexDirection={{ xs: "row", md: "column" }}
            gap={2}
            maxHeight={{ xs: "100%", sm: "300px", md: "500px" }}
            maxWidth={{ xs: "100%", sm: "500px" }}
            overflow={"auto"}
            sx={{
              scrollbarWidth: "none" /* Firefox */,
              "&::-webkit-scrollbar": {
                display: "none" /* Chrome, Safari and Opera */,
              },
            }}
          >
            {product?.images?.map((image, index) => (
              <Image
                key={index}
                src={`https://api.mantrayou.com/images/${image}`}
                alt={`Thumbnail ${index + 1}`}
                width={60}
                height={60}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  cursor: "pointer",
                  border:
                    selectedImageIndex === index ? "2px solid #000" : "none",
                }}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        className="box-shadow"
        my={4}
        borderRadius={2}
        p={{ xs: 2, sm: 4 }}
        width={{ xs: "100%", md: "50%" }}
      >
        <Typography variant="h4" fontWeight="bold">
          {product?.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {product?.brand}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Chip label="جدید" color="success" />
          {product?.sell_count > 0 && (
            <Chip
              label="پرفروش"
              color="primary"
              style={{ marginLeft: "8px" }}
            />
          )}
        </Box>
        <Typography variant="h5" color="textSecondary" mt={2}>
          {product?.price} تومان
        </Typography>
        {product?.price_discount && (
          <Typography variant="body2" color="red">
            {product?.price_wd} تومان (تخفیف {product?.price_discount}%)
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" mt={1}>
          مالیات و هزینه ارسال جداگانه محاسبه می‌شود
        </Typography>

        {product?.variations &&  (
          <ColorSelector
            colors={product.variations.map((v) => v.color)}
            onColorSelect={setSelectedColor}
            selectedColor={selectedColor}
            quantity={quantity}
            onQuantityChange={setQuantity}
            stock={stock}
          />
        )}

        {errorMessage && (
          <Typography variant="body2" color="red" mt={2}>
            {errorMessage}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" mt={2}>
          موجودی: {stock} عدد
        </Typography>

        <Box mt={2}>
          {!product?.has_variations && productInCart ? (
            <>
              {/* {stock !== 0 && ( */}
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() =>
                      handleUpdateQuantityClick(
                        product,
                        productInCart.quantity - 1
                      )
                    }
                    disabled={loadingQuantity}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {loadingQuantity ? (
                    <Loader />
                  ) : (
                    <Typography>{productInCart.quantity}</Typography>
                  )}
                  <IconButton
                    onClick={() =>
                      handleUpdateQuantityClick(
                        product,
                        productInCart.quantity + 1
                      )
                    }
                    disabled={loadingQuantity}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              {/* )} */}
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCartClick}
              disabled={
                loading ||
                (product?.has_variations && (!selectedColor || stock === 0))
              }
            >
              {loading ? (
                <>
                  <CircularProgress sx={{ color: "#fff", ml: 1 }} size={24} />
                  <Typography fontSize={"12px"} fontFamily={"iran-sans"}>
                    در حال افزودن محصول به سبد خرید
                  </Typography>
                </>
              ) : stock === 0 ? (
                "ناموجود"
              ) : (
                "افزودن به سبد خرید"
              )}
            </Button>
          )}
        </Box>
        <Typography variant="body1" mt={2}>
          {product?.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={2}>
          وزن: {product?.weight} گرم
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ابعاد: {product?.dimensions?.length}x{product?.dimensions?.width}x
          {product?.dimensions?.height} سانتی‌متر
        </Typography>
        <Typography variant="body2" color="textSecondary">
          مواد: {product?.material}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          موجودی: {product?.availability ? "موجود در انبار" : "ناموجود"}
        </Typography>
        {product?.tags?.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            style={{ marginRight: "4px", marginTop: "8px" }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
