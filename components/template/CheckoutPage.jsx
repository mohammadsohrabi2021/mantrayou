import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import CheckoutPageMobile from "../module/CheckoutPageMobile";
import CheckoutPageDesctop from "../module/CheckoutPageDesctop";


function CheckoutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  return <>{isMobile ? <CheckoutPageMobile /> : <CheckoutPageDesctop />}</>;
}

export default CheckoutPage;
