import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
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

const ProductCard = ({ product }) => {
  return (
    <StyledCard>
      <Chip
        label="Sale"
        sx={{ position: 'absolute', top: 8, left: 8, bgcolor: 'red', color: 'white' }}
      />
      <StyledCardMedia
        component="img"
        image={product.image?.src}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">{product.brand}</Typography>
        <Rating>
          <Typography variant="body2">{product.rating}</Typography>
          <Typography variant="body2">({product.reviews})</Typography>
        </Rating>
        <Typography variant="h6" component="div" fontWeight="bold">{product.title}</Typography>
        <Box display="flex" alignItems="center" my={1}>
          <OriginalPrice variant="body2">{product.originalPrice}€</OriginalPrice>
          <DiscountedPrice variant="body2">{product.discountedPrice}€</DiscountedPrice>
        </Box>
        <Typography variant="body2" color="textSecondary">{product.volume}</Typography>
        <Typography variant="body2" color="textSecondary">{product.additionalInfo}</Typography>
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>به سبد خرید اضافه کنید</Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
