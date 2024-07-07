import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";

function BannerHomePage({
  width,
  height,
  title,
  discription,
  image,
  bgcolor,
  color,
  textButton,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  heightImage,
  widthImage,
  borderRadius,
  flexDirectionBoxText,
}) {
    const matches = useMediaQuery('(max-width:600px)');
  console.log(matches);
  return (
    <Grid
      width={width}
      height={height}
      bgcolor={bgcolor}
      display={"flex"}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      borderRadius={borderRadius}
      overflow="hidden"
    >
      {matches ? (
        <Image src={image} style={{ width: "100%", height: "100%" }} />
      ) : (
        <Image src={image} style={{ width: "70%", height: "100%" }} />
      )}

      <Grid
        display={display}
        px={2}
        flexDirection={flexDirectionBoxText}
        justifyContent={justifyContent}
        alignItems={alignItems}
      >
        <Typography
          lineHeight={2}
          fontSize={"24px"}
          fontWeight={700}
          color={color}
          fontFamily={"iran-sans"}
        >
          {title}
        </Typography>
        <Typography
          lineHeight={1.75}
          fontSize={"14px"}
          fontWeight={300}
          color={color}
          fontFamily={"iran-sans"}
        >
          {discription}
        </Typography>
        <Button>{textButton}</Button>
      </Grid>
    </Grid>
  );
}

export default BannerHomePage;
