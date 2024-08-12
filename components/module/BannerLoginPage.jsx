import { Grid, Typography } from '@mui/material';
import React from 'react'

function BannerLoginPage({title,discription}) {
    const backGroundImageBanner = {
        // backgroundImage: `url('/assets/image/bannerLogin.webp')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
      const styleTypography = {
        fontFamily: "iran-sans",
        color: "#fff",
      };
  return (
    <Grid
    display={"flex"}
    flexDirection={"column"}
    width={"100%"}
    height={{ xs: "25vh", md: "30vh", lg: "46vh" }}
    style={backGroundImageBanner}
  >
    <Grid
      sx={{
        background: "linear-gradient(180deg, #0000009a, #0000004d 47%)",
      }}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Typography
        style={styleTypography}
        fontSize={{ xs: "20px", sm: "22px" }}
        mb={2}
      >
        {title}
      </Typography>
      <Typography
        style={styleTypography}
        fontSize={{ xs: "12px", sm: "14px" }}
        lineHeight={"28px"}
        textAlign={"center"}
        px={{ xs: 2, sm: 0 }}
      >
        {discription}
      </Typography>
    </Grid>
  </Grid>
  )
}

export default BannerLoginPage
