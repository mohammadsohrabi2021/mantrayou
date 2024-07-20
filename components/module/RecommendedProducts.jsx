import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import ProductCard from "./ProductCard";
import { fetchRecommendedProducts } from "@/pages/api/products/productsApi";
import { styled } from "@mui/system";

const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  display: "flex",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexWrap: "nowrap",
  },
  [theme.breakpoints.up("md")]: {
    flexWrap: "wrap",
  },
}));

const RecommendedProducts = ({ productId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      const data = await fetchRecommendedProducts(productId);
      setRecommendedProducts(data);
      setLoading(false);
    };

    loadRecommendedProducts();
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4} className="box-shadow" borderRadius={2} p={3}>
      <Typography fontFamily={"iran-sans"} mb={2}>
        محصولات پیشنهادی
      </Typography>
      <ScrollableBox>
        {recommendedProducts?.map((product) => (
          <Box key={product.id} minWidth={{ xs: 250, sm: 200, md: "auto" }} mb={2}>
            <ProductCard {...product} />
          </Box>
        ))}
      </ScrollableBox>
    </Box>
  );
};

export default RecommendedProducts;
