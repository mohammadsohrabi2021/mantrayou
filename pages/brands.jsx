import BannerHomePage from '@/components/module/BannerHomePage'
import { Grid } from '@mui/material'
import React from 'react'
import Bildschirmfoto from "../assets/images/Bildschirmfoto.webp";
function Brands() {
  return (
    <Grid>
      Brands
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
  )
}

export default Brands
