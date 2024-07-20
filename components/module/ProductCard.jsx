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
import baseImage from '../../assets/images/logoSite.png'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCartMethod, updateCartQuantityMethod, removeFromCartMethod } from "../../redux/appSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
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
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const productInCart = cart.find(item => item.id === (id !== undefined ? id : _id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    const product = {
      id: id !== undefined ? id : _id,
      name,
      price,
      price_wd,
      variations,
      main_image
    };
    dispatch(addToCartMethod(product));
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      dispatch(removeFromCartMethod({ id: id !== undefined ? id : _id }));
    } else {
      dispatch(updateCartQuantityMethod({ id: id !== undefined ? id : _id, quantity: newQuantity }));
    }
  };

  if (!mounted) {
    return null;
  }

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
        {productInCart ? (
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleUpdateQuantity(productInCart.quantity - 1)}>
              <RemoveIcon />
            </IconButton>
            <Typography>{productInCart.quantity}</Typography>
            <IconButton onClick={() => handleUpdateQuantity(productInCart.quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        ) : (
          <Button variant="outlined" fullWidth sx={{ mt: 2, fontFamily: 'iran-sans' }} onClick={handleAddToCart}>
            به سبد خرید اضافه کنید
          </Button>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
