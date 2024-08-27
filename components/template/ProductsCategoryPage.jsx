import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {
  getAllProducts,
  getTotalProducts,
} from "@/pages/api/homePage/homePageApi";
import ProductCard from "../module/ProductCard";
import CustomPagination from "../style/CustomPagination";

function ProductsCategoryPage({ selectedCategory, filter, page, setPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  console.log(selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const resData = await getAllProducts(
          10,
          page,
          filter,
          selectedCategory
        );
        const totalProducts = await getTotalProducts(selectedCategory);

        if (!resData || !totalProducts) {
          throw new Error("Data not received properly");
        }

        const totalPages = Math.ceil(totalProducts?.total_count / 10); // Assumed itemsPerPage is 10

        setTotalPages(totalPages);
        setProducts(resData);
      } catch (err) {
        setError("خطا در دریافت محصولات");
        console.error("Fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, filter, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  // if (error) return <p>خطا: {error}</p>;

  return (
    <Box>
      <Box 
        sx={{ 
          marginTop: 2, 
          height: '60vh', // ارتفاع کانتینر
          overflowY: 'auto', // اسکرول داخلی
          pr: 2, // فاصله داخلی راست برای جلوگیری از همپوشانی اسکرول‌بار
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Box
              key={product.id}
              minWidth={{ xs: 250, sm: 200, md: "auto" }}
              width={300}
              mb={2}
            >
              <ProductCard {...product} />
            </Box>
          ))
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '60vh',
              textAlign: 'center',
              color: '#555'
            }}
          >
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, color: '#bbb' }} />
            <Typography fontFamily={'iran-sans'} variant="h6" sx={{ marginTop: 2 }}>
              متاسفانه این دسته بندی بدون محصول است.
            </Typography>
          </Box>
        )}
      </Box>

      {products.length > 0 && (
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
          <CustomPagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default ProductsCategoryPage;
