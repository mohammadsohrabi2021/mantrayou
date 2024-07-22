import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import baseImage from '../../assets/images/logoSite.png';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCartMethod, updateCartQuantityMethod, removeFromCartMethod, setSelectedProductIdMethod, updateVariationSelectionMethod, updateQuantitySelectionMethod, resetVariationSelectionMethod } from "../../redux/appSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VariationModal from './VariationModal';

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
  _id
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const selectedProductId = useSelector((state) => state.app.selectedProductId);
  const selectedVariation = useSelector((state) => state.app.selectedVariation);
  const selectedQuantity = useSelector((state) => state.app.selectedQuantity);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    if (has_variations) {
      dispatch(setSelectedProductIdMethod(id !== undefined ? id : _id));
      setOpen(true);
    } else {
      const product = {
        id: id !== undefined ? id : _id,
        name,
        price,
        price_wd,
        variation: {},
        main_image,
        quantity: 1
      };
      dispatch(addToCartMethod(product));
    }
  };

  const handleUpdateQuantity = (product, newQuantity) => {
    const payload = {
      id: product.id,
      variation: product.variation || {}
    };

    if (newQuantity === 0) {
      dispatch(removeFromCartMethod(payload));
    } else {
      dispatch(updateCartQuantityMethod({ ...payload, quantity: newQuantity }));
    }
  };

  const handleSelectVariation = ({ variation, quantity }) => {
    const product = {
      id: selectedProductId,
      name,
      price,
      price_wd,
      variation: variation ? { color: variation } : {},
      main_image,
      quantity
    };
    dispatch(addToCartMethod(product));
    dispatch(resetVariationSelectionMethod());
    setOpen(false); // Close the modal after selecting variation
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
          image={main_image !== null ? `https://api.mantrayou.com/images/${main_image}` : `${baseImage.src}`}
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
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleUpdateQuantity(productInCartWithoutVariations, productInCartWithoutVariations.quantity - 1)}>
              <RemoveIcon />
            </IconButton>
            <Typography>{productInCartWithoutVariations.quantity}</Typography>
            <IconButton onClick={() => handleUpdateQuantity(productInCartWithoutVariations, productInCartWithoutVariations.quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
        {!has_variations && !productInCartWithoutVariations && (
          <Button variant="outlined" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} onClick={handleAddToCart}>
            به سبد خرید اضافه کنید
          </Button>
        )}
        {has_variations && (
          <Button variant="outlined" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} onClick={handleAddToCart}>
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
