// pages/products.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { getAllProducts, getTotalProducts } from "../api/homePage/homePageApi";
import ProductCard from "@/components/module/ProductCard";
import BannerHomePage from "@/components/module/BannerHomePage";
import Bildschirmfoto from "../../assets/images/Bildschirmfoto.webp";
import CustomPagination from "@/components/style/CustomPagination";
function Products({ initialProducts, initialFilter, initialPage, totalPages }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async (event, newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page
    setLoading(true);

    const data = await getAllProducts(10, 1, newFilter);
    setProducts(data);
    setLoading(false);

    router.push(
      {
        pathname: router.pathname,
        query: { filter_by: newFilter, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = async (event, value) => {
    setPage(value);
    setLoading(true);

    const data = await getAllProducts(10, value, filter);
    setProducts(data);
    setLoading(false);

    router.push(
      {
        pathname: router.pathname,
        query: { filter_by: filter, page: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Grid>
      <Tabs
        value={filter}
        onChange={handleFilterChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        className="box-shadow"
        sx={{ padding: 2, marginTop: 3, borderRadius: 2 }}
      >
        <Tab label="پرفروش ترین"sx={{fontFamily:'iran-sans'}} value="bestsellers" />
        <Tab label="ترندها"sx={{fontFamily:'iran-sans'}} value="trends" />
        <Tab label="قیمت صعودی"sx={{fontFamily:'iran-sans'}} value="price_ascending" />
        <Tab label="قیمت نزولی"sx={{fontFamily:'iran-sans'}} value="price_descending" />
        <Tab label="محبوب ترین"sx={{fontFamily:'iran-sans'}} value="most_liked" />
      </Tabs>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          my={5}
          display={"flex"}
          className="box-shadow"
          flexDirection={"column"}
          p={{ xs: 1, md: 4 }}
        >
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={3}
            justifyContent={"space-between"}
          >
            {products?.map((product) => (
              <Grid
                width={{ xs: 400, sm: 348, md: 400 }}
                item
                xs={12}
                sm={5}
                md={3}
                key={product.id}
              >
                <ProductCard {...product} />
              </Grid>
            ))}
          </Box>
          <Box my={3} display="flex" justifyContent="center">
            <CustomPagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      )}

      <Grid className="box-shadow" p={2} mt={2} borderRadius={3}>
        <BannerHomePage
          title={"معاملات خبرنامه"}
          discription={"10% تخفیف برای سفارش شما 🖤"}
          flexDirection={{ xs: "column", sm: "row-reverse" }}
          image={Bildschirmfoto}
          justifyContent={"space-between"}
          height={{ xs: "auto", sm: "500px" }}
          width={"100%"}
          borderRadius={"20px"}
          textButton={"ثبت نام"}
          bgColor="#000"
          textColor="#fff"
          hoverBgColor="#fff"
          hoverTextColor="#000"
          borderColor="#fff"
        />
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const filter = context.query.filter_by || "bestsellers";
  const page = context.query.page || 1;
  const itemsPerPage = 10;

  try {
    const data = await getAllProducts(itemsPerPage, page, filter);
    const totalProducts = await getTotalProducts() // فرض می‌گیریم 100 محصول داریم
    const totalPages = Math.ceil(totalProducts?.total_count / itemsPerPage);

    return {
      props: {
        initialProducts: data,
        initialFilter: filter,
        initialPage: parseInt(page, 10),
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        initialProducts: [],
        initialFilter: filter,
        initialPage: 1,
        totalPages: 1,
      },
    };
  }
}

export default Products;
