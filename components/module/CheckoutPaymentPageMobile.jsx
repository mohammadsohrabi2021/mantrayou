import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import ProductCardCheckOut from "./ProductCardCheckOut";
import logoPost from "../../assets/images/logoPost.png";
import Image from "next/image";
import Link from "next/link";
import AddressModalCheckOut from "./AddressModalCheckOut";
import {
  applyCouponCode,
  getDataCheckOutUser,
  getPaymentMethods,
  getShippingMethods,
  selectPaymentMethod,
  updateShippingMethod,
} from "@/pages/api/checkout/checkoutApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../icons/Loader";
import { saveCheckoutInfoMethod } from "@/redux/appSlice";
import { fetchData } from "@/utils/fetchDataCheckOut";
function CheckoutPaymentPageMobile() {
  const dispatch = useDispatch();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // کد تخفیف
  const [responseMessage, setResponseMessage] = useState(""); // پیام پاسخ
  const [loading, setLoading] = useState(false); // وضعیت لودینگ
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const checkout = useSelector((state) => state.app.checkout);
  const [shippingMethods, setShippingMethods] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const methods = await getPaymentMethods();
        setPaymentMethods(methods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    const fetchShippingMethods = async () => {
      try {
        const methods = await getShippingMethods();
        setShippingMethods(methods);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };

    fetchMethods();
    fetchShippingMethods();
  }, []);

  const handleSelectMethod = async (methodId) => {
    setSelectedMethod(methodId);
    try {
      await selectPaymentMethod(token, methodId);
      fetchData(dispatch, setLoading);
    } catch (error) {
      console.error("Error selecting payment method:", error);
    }
  };
  const handleSelectShippingMethod = async (methodId) => {
    setSelectedShippingMethod(methodId);
    try {
      await updateShippingMethod(methodId,token);
      fetchData(dispatch, setLoading);
    } catch (error) {
      console.error("Error selecting payment method:", error);
    }
  };
  const toggleDiscount = () => {
    setDiscountOpen(!discountOpen);
  };

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
    setResponseMessage(""); // پاک کردن پیام پاسخ در صورت تغییر ورودی
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim() === "") {
      toast.warn("لطفا کد تخفیف خود را وارد کنید");
      return;
    }
    setLoading(true); // شروع لودینگ
    try {
      const data = await applyCouponCode(token, couponCode);
      setResponseMessage(data?.detail?.fa);

      fetchData(dispatch, setLoading);
    } catch (error) {
      setResponseMessage(`خطا در اعمال کد تخفیف: ${error.message}`);
      console.error("Error applying coupon:", error);
    }
    setLoading(false); // پایان لودینگ
  };

  return (
    <Box position={"relative"} sx={{ pb: "72px" }}>
      <Typography
        textAlign={"center"}
        width={"100%"}
        p={2}
        fontSize={"18px"}
        sx={{ color: "red", fontFamily: "iran-sans", fontWeight: "bold" }}
      >
        فروشگاه آنلاین مانترا
      </Typography>
      <Link href={"/checkout"}>
        <Button
          variant="text"
          startIcon={<ArrowForwardIcon />}
          sx={{
            color: "black",
            width: "max-content",
            textTransform: "none",
            fontFamily: "iran-sans",
            fontWeight: "bold",
            gap: 1,
          }}
        >
          پرداخت
        </Button>
      </Link>

      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />

      <Box display={"flex"} flexDirection={"column"} px={3} py={2}>
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "iran-sans",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
              color={"#0c0c0c"}
              fontSize={"12px"}
            >
              انتخاب روش پرداخت
            </Typography>
            <RadioGroup
              value={selectedMethod}
              onChange={(e) => handleSelectMethod(e.target.value)}
            >
              {paymentMethods.map((method) => (
                <Box key={method._id}>
                  <FormControlLabel
                    value={method._id}
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "iran-sans", fontWeight: "bold" }}
                        >
                          {method.name}
                        </Typography>
                        {method.price > 0 && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontFamily: "iran-sans" }}
                          >
                            {method.price} تومان
                          </Typography>
                        )}
                      </Box>
                    }
                    sx={{
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                      width: "100%",
                      margin: 0,
                      padding: "10px 0",
                    }}
                  />
                  {/* <Divider /> */}
                </Box>
              ))}
            </RadioGroup>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />
      <Box display={"flex"} flexDirection={"column"} px={3} py={2}>
        <Box display={"flex"} flexDirection={"column"}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "iran-sans",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
              color={"#0c0c0c"}
              fontSize={"12px"}
            >
              انتخاب روش ارسال
            </Typography>
            <RadioGroup
              value={selectedShippingMethod}
              onChange={(e) => handleSelectShippingMethod(e.target.value)}
            >
              {shippingMethods.map((method) => (
                <Box key={method._id}>
                  <FormControlLabel
                    value={method._id}
                    control={<Radio />}
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "iran-sans", fontWeight: "bold" }}
                        >
                          {method.name}
                        </Typography>
                        {method.price > 0 && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontFamily: "iran-sans" }}
                          >
                            {method.price?.toLocaleString()} تومان
                          </Typography>
                        )}
                      </Box>
                    }
                    sx={{
                      borderBottom: "1px solid #ddd",
                      cursor: "pointer",
                      width: "100%",
                      margin: 0,
                      padding: "10px 0",
                    }}
                  />
                  {/* <Divider /> */}
                </Box>
              ))}
            </RadioGroup>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />
      <Box
        sx={{
          padding: "10px 20px",
          // border: "1px solid #ddd",
          // borderRadius: "8px",
        }}
      >
        {/* بخش کد تخفیف */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={toggleDiscount}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            sx={{
              fontFamily: "iran-sans",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            کد تخفیف
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              lineHeight={2.15}
              fontWeight={700}
              fontFamily={"iran-sans"}
              color={"#19bfd3"}
              fontSize={"12px"}
            >
              {discountOpen ? "بستن" : "انتخاب یا وارد کردن کد تخفیف"}
            </Typography>

            <IconButton>
              {discountOpen ? (
                <ExpandLessIcon style={{ color: "#19bfd3" }} />
              ) : (
                <ExpandMoreIcon style={{ color: "#19bfd3" }} />
              )}
            </IconButton>
          </Box>
        </Box>
        <Typography
          fontFamily={"iran-sans"}
          color={"#a1a3a8"}
          fontWeight={400}
          lineHeight={2.17}
          fontSize={"12px"}
        >
          می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان یک
          کد وارد کنید.
        </Typography>
        <Collapse in={discountOpen}>
          <TextField
            // fullWidth
            placeholder="کد تخفیف را وارد کنید"
            variant="outlined"
            sx={{ marginBottom: 2, marginTop: 2 }}
            value={couponCode}
            onChange={handleCouponCodeChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    // variant="contained"
                    sx={{
                      fontFamily: "iran-sans",
                      fontWeight: "bold",
                      color: "gray",
                    }}
                    onClick={handleApplyCoupon}
                    disabled={loading}
                  >
                    {loading ? <Loader /> : "ثبت"}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {responseMessage && (
            <Typography
              sx={{
                marginTop: 2,
                color: responseMessage.includes("موفقیت") ? "green" : "red",
                fontFamily: "iran-sans",
                fontSize: "12px",
              }}
            >
              {responseMessage}
            </Typography>
          )}
        </Collapse>
      </Box>
      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />

      <Box p={2}>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            قیمت کالاها ({checkout?.items?.length})
          </Typography>
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            {checkout?.total_price?.toLocaleString()} تومان
          </Typography>
        </Grid>
        <Box sx={{ my: 1, height: "1px", bgcolor: "#f0f0f1" }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            هزینه ارسال
          </Typography>
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            {checkout?.shipping_fee?.toLocaleString()} تومان
          </Typography>
        </Box>
        <Box sx={{ my: 1, height: "1px", bgcolor: "#f0f0f1" }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            تخفیف کالاها
          </Typography>
          <Typography
            sx={{ fontFamily: "iran-sans" }}
            color={"#62666d"}
            fontSize={"12px"}
          >
            {checkout?.offset_profit?.toLocaleString()} تومان
          </Typography>
        </Box>
        <Box sx={{ my: 1, height: "1px", bgcolor: "#f0f0f1" }} />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"iran-sans"}
            color={"red"}
            fontSize={"12px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            سود شما از خرید
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            color={"red"}
            fontSize={"14px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            {checkout?.offset_profit?.toLocaleString()} تومان
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY={2}
        >
          <Typography sx={{ fontFamily: "iran-sans", fontWeight: "bold" }}>
            قابل پرداخت
          </Typography>
          <Typography
            sx={{
              fontFamily: "iran-sans",
              color: "#62666d",
            }}
            lineHeight={2.15}
            fontSize={"14px"}
            fontWeight={700}
          >
            {checkout?.total_price_wd?.toLocaleString()} تومان
          </Typography>
        </Box>
      </Box>
      <Box
        borderTop={"1px solid #e0e0e2"}
        bgcolor={"#fff"}
        position={"fixed"}
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        right={0}
        left={0}
        bottom={0}
        height={"72px"}
        boxShadow={
          "0 -1px 1px rgba(0, 0, 0, .14), 0 -2px 2px rgba(0, 0, 0, .05"
        }
      >
        <Link href={"/checkout/payment"}>
          <Button
            variant="contained"
            sx={{ fontFamily: "iran-sans", backgroundColor: "#000" }}
          >
            ثبت سفارش
          </Button>
        </Link>
        <Grid>
          <Typography
            color={"#81858b"}
            fontWeight={400}
            fontSize={"12px"}
            lineHeight={2.17}
            fontFamily={"iran-sans"}
            textAlign={"center"}
          >
            جمع سبد خرید
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            lineHeight={2.15}
            fontWeight={400}
            fontSize={"12px"}
          >
            {checkout?.overall_basket_price?.toLocaleString()} تومان
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
}

export default CheckoutPaymentPageMobile;
