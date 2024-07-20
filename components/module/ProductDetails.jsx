import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import baseImage from "../../assets/images/logoSite.png";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter();
  const thumbnailRef = useRef(null);
  const selectedImage = product?.images[selectedImageIndex];

  useEffect(() => {
    scrollToThumbnail(selectedImageIndex);
  }, [selectedImageIndex]);

  if (router.isFallback) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleAddToCart = () => {
    // Logic for adding product to cart
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

  return (
    <Grid
      my={4}
      display={"flex"}
      flexDirection={{ xs: "column", md: "row-reverse" }}
      justifyContent={"space-between"}
      alignItems={{ md: "center" }}
      width={'100%'}
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
              alt={product?.name || 'Product Image'}
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
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
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
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
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
        width={{ xs: '100%', md: '50%' }}
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
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            افزودن به سبد خرید
          </Button>
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
