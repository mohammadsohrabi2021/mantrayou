import React from "react";
import { useRouter } from "next/router";
import { getProduct } from "../api/products/productsApi";
import ProductDetails from "@/components/module/ProductDetails";
import ProductReviews from "@/components/module/ProductReviews";
import RecommendedProducts from "@/components/module/RecommendedProducts";
import { Box, CircularProgress } from "@mui/material";

const ProductPage = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <ProductDetails product={product} />
      <RecommendedProducts productId={product?._id} />
      <ProductReviews productId={product?._id} />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { productId } = context.params;
  try {
    const product = await getProduct(productId);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}

export default ProductPage;

