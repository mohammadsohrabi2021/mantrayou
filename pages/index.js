import BannerHomePage from "@/components/module/BannerHomePage";
import { Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { dataBannerImageHomePage } from "@/Data/DataBannerHomePage";
import ProductCard from "@/components/module/ProductCard";
import BannerCategoryList from "@/components/module/BannerCategoryList";
import { getAllProducts } from "./api/homePage/homePageApi";
import { saveProductsInfoMethod } from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonProductCard from "@/components/module/SkeletonProductCard";
import { dataBannerCategory } from "@/Data/DataBannerCategories";
import Image from "next/image";
import styled from "styled-components";
import ReviewSlider from "@/components/module/ReviewSlider";
import Bildschirmfoto from "../assets/images/Bildschirmfoto.webp";
function Home({ initialProducts }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveProductsInfoMethod(initialProducts));
  }, [dispatch, initialProducts]);

  const productsList = useSelector((state) => state.app.products);
  const bannerItem = dataBannerImageHomePage.find((item) => item.id === 1);

  const getSliceRange = (itemId) => {
    if (itemId === 2) {
      return [0, 4];
    } else if (itemId === 3) {
      return [4, 8];
    } else {
      return [8, 12];
    }
  };

  const renderSkeletons = () => {
    return Array.from(new Array(4)).map((_, index) => (
      <Grid
        width={{ xs: "100%", sm: "340px", md: "270px", lg: "300px" }}
        position={"relative"}
        key={index}
      >
        <SkeletonProductCard />
      </Grid>
    ));
  };
  const StyledImage = styled(Image)`
    border-radius: 180px 180px 10px 10px;

    @media (max-width: 768px) {
      border-radius: 100%;
      width: 120px;
      height: 120px;
      margin: 15px;
    }
    @media (max-width: 330px) {
      margin: 4px;
    }
  `;

  return (
    <Grid mt={2} display={"flex"} flexDirection={"column"} gap={2}>
      <BannerCategoryList />
      {bannerItem && <BannerHomePage key={bannerItem.id} {...bannerItem} />}
      {dataBannerImageHomePage
        .filter((item) => item.id !== 1)
        .map((item) => {
          const [sliceStart, sliceEnd] = getSliceRange(item.id);
          return (
            <Grid className="box-shadow" p={2} borderRadius={3} key={item.id}>
              <BannerHomePage {...item} />
              <Grid
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
                mt={2}
              >
                {initialProducts.length === 0
                  ? renderSkeletons()
                  : initialProducts
                      .slice(sliceStart, sliceEnd)
                      .map((product) => (
                        <Grid
                          width={{
                            xs: "100%",
                            sm: "340px",
                            md: "270px",
                            lg: "300px",
                          }}
                          position={"relative"}
                          key={product.id}
                        >
                          <ProductCard {...product} />
                        </Grid>
                      ))}
              </Grid>
            </Grid>
          );
        })}
      <Grid className="box-shadow" p={2} borderRadius={3}>
        <Grid display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            lineHeight={3}
            fontFamily={"iran-sans"}
            fontWeight={"bold"}
            fontSize={"22px"}
          >
            دسته بندی های محبوب
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            maxWidth={"200px"}
            fontWeight={"bold"}
            fontSize={"14px"}
            textAlign={"center"}
          >
            محبوب ترین محصولات را از دسته های پرطرفدار ما از سراسر جهان زیبایی
            پیدا کنید.
          </Typography>
        </Grid>
        <Grid
          py={6}
          display={"flex"}
          justifyContent={{ xs: "center", md: "space-between" }}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          {dataBannerCategory.map((item) => (
            <Grid
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              key={item.id}
            >
              <StyledImage
                src={item.imageUrl}
                alt={item.title}
                // style={{ borderRadius:{xs:'100%',sm: "180px 180px 10px 10px"} }}
              />
              <Typography fontFamily={"iran-sans"} fontWeight={"bold"} mt={2}>
                {item.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Typography
        className="box-shadow"
        borderRadius={3}
        p={2}
        textAlign={"center"}
        fontSize={"22px"}
        my={3}
        fontWeight={"bolder"}
        fontFamily={"iran-sans"}
      >
        دیدگاه مشتریان
      </Typography>
      <ReviewSlider />
      <Grid className="box-shadow" p={2} mt={2} borderRadius={3}>
        <BannerHomePage
          title={"معاملات خبرنامه"}
          discription={'10% تخفیف برای سفارش شما 🖤'}
          flexDirection={{ xs: 'column', sm: 'row-reverse' }}
          image={Bildschirmfoto}
          justifyContent={'space-between'}
          height={{xs:'auto',sm:"500px"}}
          width={"100%"}
          borderRadius={"20px"}
          textButton={'ثبت نام'}
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

export const getStaticProps = async () => {
  try {
    const products = await getAllProducts(20, 1); // Provide default values or appropriate values
    return {
      props: { initialProducts: products },
      revalidate: 3600, // Revalidate every hour (3600 seconds)
    };
  } catch (error) {
    console.error("Failed to fetch products", error);
    return {
      props: { initialProducts: [] },
    };
  }
};

export default Home;
