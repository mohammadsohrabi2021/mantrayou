import BannerHomePage from "@/components/module/BannerHomePage";
import { Grid } from "@mui/material";
import React from "react";

import { dataBannerImageHomePage, products } from "@/Data/DataBannerHomePage";
import ProductCard from "@/components/module/ProductCard";
import BannerCategoryList from "@/components/module/BannerCategoryList";
function Home() {
  const bannerItem = dataBannerImageHomePage.find((item) => item.id === 1);

  return (
    <Grid mt={2} display={"flex"} flexDirection={"column"} gap={2}>
      <BannerCategoryList/>
      {bannerItem && <BannerHomePage key={bannerItem.id} {...bannerItem} />}
      {dataBannerImageHomePage
        .filter((item) => item.id !== 1)
        .map((item) => (
          <Grid className="box-shadow" p={2} borderRadius={3} key={item.id}>
            <BannerHomePage {...item} />
            <Grid
              display={"flex"}
              flexWrap={'wrap'}
              justifyContent={"space-between"}
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
              mt={2}
            >
              {products.map((product) => (
                <Grid width={{xs:"100%",sm:'340px',md:'270px',lg:'300px'}} position={'relative'} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default Home;
