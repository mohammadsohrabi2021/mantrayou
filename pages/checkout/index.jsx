import CheckoutPage from "@/components/template/CheckoutPage";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, CircularProgress } from "@mui/material";
import { fetchData } from "@/utils/fetchDataCheckOut";
import Cookies from "js-cookie";

function Checkout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    fetchData(dispatch, setLoading);
  }, [dispatch, token]);

  if (loading) {
    return (
      <Grid
        display={"flex"}
        gap={1}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography fontFamily={"iran-sans"}>
          درحال دریافت اطلاعات لطفا صبور باشید...
        </Typography>
        <CircularProgress />
      </Grid>
    );
  }

  return <CheckoutPage />;
}

export default Checkout;
