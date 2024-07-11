import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

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
  price_wd
}) => {
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
      <StyledCardMedia
        component="img"
        image={`https://api.mantrayou.com/images/${main_image}`}
        alt={name}
      />
      <CardContent>
        {/* <Typography variant="subname2" color="textSecondary">{product.brand}</Typography> */}
        <Rating>
          {/* <Typography variant="body2">{product.rating}</Typography>
          <Typography variant="body2">({product.reviews})</Typography> */}
        </Rating>
        <Typography fontFamily={'iran-sans'} fontWeight="bold">{name}</Typography>
        <Box display="flex" alignItems="center" my={1}>
          <OriginalPrice variant="body2">{price}€</OriginalPrice>
          <DiscountedPrice variant="body2">{price_wd}€</DiscountedPrice>
        </Box>
        <Typography variant="body2" color="textSecondary">{has_variations? 'تنوع رنگ دارد':'تنوع رنگ ندارد'}</Typography>
        <Typography variant="body2" color="textSecondary">{availability? 'موجود در انبار':'ناموجود'}</Typography>
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>به سبد خرید اضافه کنید</Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
