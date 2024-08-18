import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecommendedProducts } from "@/pages/api/products/productsApi";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import baseImage from '../../assets/images/mantra.png';
import Link from "next/link";
import { useRouter } from 'next/router';
import { setCartDrawerOpen } from "@/redux/appSlice"; // Import setCartDrawerOpen from your Redux slice

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SliderContainer = styled(Box)`
  width: 100%;
`;

const ProductCard = styled(Box)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
`;

const ProductName = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-align: left;
`;

const ProductPrice = styled(Typography)`
  font-size: 16px;
  color: #888;
  margin-bottom: 10px;
  text-align: left;
`;

const AddToCartButton = styled(Button)`
  border: 1px solid #000;
  color: #000;
  border-radius: 8px;
  text-transform: none;
  font-weight: bold;
  padding: 8px 16px;
  width: 100%;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

function SuggestedProducts() {
  const cart = useSelector((state) => state.app.cart);
  const [previousCartIds, setPreviousCartIds] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch(); // Use dispatch from Redux

  useEffect(() => {
    const currentCartIds = cart.map((item) => item.id);

    const isProductAdded = currentCartIds.some((id) => !previousCartIds.includes(id));
    const isProductRemoved = previousCartIds.some((id) => !currentCartIds.includes(id));

    if (isProductAdded || isProductRemoved) {
      const fetchProducts = async () => {
        const data = await fetchRecommendedProducts(currentCartIds);
        if (data) {
          setRecommendedProducts(data);
        }
      };

      fetchProducts();
    }

    setPreviousCartIds(currentCartIds);
  }, [cart]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavigating(false);
      dispatch(setCartDrawerOpen(false)); // Use dispatch to close the cart drawer
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, dispatch]);

  const handleSlideChange = () => {
    if (swiper) {
      if (swiper.isEnd && swiper.navigation?.$nextEl?.[0]) {
        swiper.navigation.$nextEl[0].style.display = "none";
      } else if (swiper.navigation?.$nextEl?.[0]) {
        swiper.navigation.$nextEl[0].style.display = "block";
      }

      if (swiper.isBeginning && swiper.navigation?.$prevEl?.[0]) {
        swiper.navigation.$prevEl[0].style.display = "none";
      } else if (swiper.navigation?.$prevEl?.[0]) {
        swiper.navigation.$prevEl[0].style.display = "block";
      }
    }
  };

  const handleNavigate = () => {
    setIsNavigating(true);
  };

  return (
    <SliderContainer sx={{ padding: '20px 0' }}>
      <Typography variant="h6" fontFamily={'iran-sans'} fontSize={'14px'} sx={{ marginBottom: '20px' }}>
        این محصولات با انتخاب شما مطابقت دارند:
      </Typography>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        style={{ width: '100%' }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        onReachEnd={handleSlideChange}
        onReachBeginning={handleSlideChange}
      >
        {recommendedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard>
              <ProductImageWrapper>
                <Image
                  src={product.main_image ? `https://api.mantrayou.com/images/${product.main_image}` : baseImage}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                />
              </ProductImageWrapper>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price_wd} €</ProductPrice>
              <Link href={`/products/${product._id}`} passHref>
                <AddToCartButton onClick={handleNavigate} disabled={isNavigating} sx={{fontFamily:'iran-sans'}}>
                  {isNavigating ? "در حال هدایت به صفحه محصول" : "مشاهده محصول"}
                </AddToCartButton>
              </Link>
            </ProductCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  );
}

export default SuggestedProducts;
