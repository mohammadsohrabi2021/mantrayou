import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Grid
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/system";
import baseImage from '../../assets/images/logoSite.png';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VariationModal from './VariationModal';
import { handleAddToCart, handleUpdateQuantity, handleRemoveItem } from "@/utils/cartUtils";
import { setSelectedProductIdMethod, resetVariationSelectionMethod, setCartDrawerOpen } from "@/redux/appSlice"; // Import the necessary methods
import Loader from "../icons/Loader";

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  /* width: 300px; */
`;

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const DiscountedPrice = styled(Typography)`
  color: red;
  font-weight: bold;
  margin-left: 8px;
`;

const OriginalPrice = styled(Typography)`
  text-decoration: line-through;
  margin-left: 8px;
`;

const Rating = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProductCard = ({
  availability,
  has_variations,
  id,
  images,
  likes_count,
  main_image,
  name,
  price,
  sell_count,
  variations,
  views_count,
  price_wd,
  quantity,
  total_quantity,
  _id
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const selectedProductId = useSelector((state) => state.app.selectedProductId);
  const selectedVariation = useSelector((state) => state.app.selectedVariation);
  const selectedQuantity = useSelector((state) => state.app.selectedQuantity);
  const [loading, setLoading] = useState(false);
  const [loadingQuantity, setLoadingQuantity] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCartClick = async() => {
    if (has_variations) {
      dispatch(setSelectedProductIdMethod(id !== undefined ? id : _id));
      setOpen(true);
    } else {
      setLoading(true);
      const product = {
        id: id !== undefined ? id : _id,
        name,
        price,
        price_wd,
        variation: {},
        main_image,
        quantity:1
      };

      await handleAddToCart(dispatch, product);
      setLoading(false);
      dispatch(setCartDrawerOpen(true));
    }
  };

  const handleUpdateQuantityClick = async(product, newQuantity) => {
    console.log(product, newQuantity)
    setLoadingQuantity(true);  // تنظیم وضعیت لودینگ برای کارت خاص
    await handleUpdateQuantity(dispatch, product, newQuantity);
    setLoadingQuantity(false);  // بازگشت وضعیت لودینگ به حالت قبلی پس از اتمام عملیات
  };

  const handleSelectVariation = async({ variation, quantity }) => {
    const product = {
      id: selectedProductId,
      name,
      price,
      price_wd,
      variation: variation ? { color: variation } : {},
      main_image,
      quantity
    };
    await handleAddToCart(dispatch, product, variation ? { color: variation } : {});
    dispatch(resetVariationSelectionMethod());
    setOpen(false);
    dispatch(setCartDrawerOpen(true));
  };

  if (!mounted) {
    return null;
  }

  const productInCartWithoutVariations = cart.find(product => product.id === (id !== undefined ? id : _id) && (!product.variation || Object.keys(product.variation).length === 0));

  return (
    <StyledCard>
      <Chip
        label="Sale"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "red",
          color: "white",
        }}
      />
      <Link href={`/products/${id === undefined ? _id : id}`}>
        <StyledCardMedia
          component="img"
          image={main_image !== null ?`https://api.mantrayou.com/images/${main_image}` : `${baseImage.src}`}
          alt={name}
        />
      </Link>
      <CardContent>
        <Rating></Rating>
        <Typography fontFamily={'iran-sans'} fontWeight="bold">{name}</Typography>
        <Box display="flex" alignItems="center" my={1}>
          <OriginalPrice variant="body2">{price}€</OriginalPrice>
          <DiscountedPrice variant="body2">{price_wd}€</DiscountedPrice>
        </Box>
        <Typography variant="body2" color="textSecondary">{has_variations ? 'تنوع رنگ دارد' : 'تنوع رنگ ندارد'}</Typography>
        <Typography variant="body2" color="textSecondary">{availability ? 'موجود در انبار' : 'ناموجود'}</Typography>
        {productInCartWithoutVariations && !has_variations && (
          <Box display="flex" alignItems="center" mt={1.5} width={'max-content'} borderRadius={1} border={'1px solid lightGray'} justifyContent={'center'}>
            <IconButton onClick={() => handleUpdateQuantityClick(productInCartWithoutVariations, productInCartWithoutVariations.quantity - 1)}>
              {productInCartWithoutVariations.quantity > 1 ? <RemoveIcon style={{color:'red'}}/>:<DeleteIcon  style={{color:'red'}}/>}
            </IconButton>
            {loadingQuantity ? (
              <Loader />
            ) : (
              <Grid display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Typography>{productInCartWithoutVariations.quantity}</Typography>
                <Typography fontFamily={'iran-sans'} fontSize={'12px'} color={'red'}>{productInCartWithoutVariations.quantity >= total_quantity && "حداکثر"}</Typography>
              </Grid>
            )}
            <IconButton 
              onClick={() => handleUpdateQuantityClick(productInCartWithoutVariations, productInCartWithoutVariations.quantity + 1)}
              disabled={productInCartWithoutVariations.quantity >= total_quantity}  // اضافه کردن شرط برای غیرفعال کردن دکمه
            >
              <AddIcon  style={{color:'green'}}/>
            </IconButton>
          </Box>
        )}
        {!has_variations && !productInCartWithoutVariations && (
          <Button variant="outlined" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} onClick={handleAddToCartClick} disabled={loading}>
            {loading ?     <>
                  <CircularProgress sx={{ color: "blue", ml: 1 }} size={24} />
                  <Typography fontSize={"12px"} fontFamily={"iran-sans"}>
                    در حال افزودن محصول به سبد خرید
                  </Typography>
                </> : 'به سبد خرید اضافه کنید'}
          </Button>
        )}
        {has_variations && (
          <Button variant="outlined" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} onClick={handleAddToCartClick} disabled={loading}>
           نوع را انتخاب کنید
          </Button>
        )}
      </CardContent>
      <VariationModal 
        open={open} 
        onClose={() => setOpen(false)} 
        variations={variations.map(v => v.color)} 
        onSelect={handleSelectVariation} 
        productName={name}
      />
    </StyledCard>
  );
};

export default ProductCard;