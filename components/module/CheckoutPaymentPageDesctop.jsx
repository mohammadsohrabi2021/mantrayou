import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  TextField,
  Collapse,
  IconButton,
  Grid,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";
import {
  getPaymentMethods,
  selectPaymentMethod,
  applyCouponCode,
  getShippingMethods,
  updateShippingMethod,
  deleteCoupon,
} from "@/pages/api/checkout/checkoutApi";
import { toast } from "react-toastify";
import Loader from "../icons/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/utils/fetchDataCheckOut";
import DeleteIcon from "@mui/icons-material/Delete";
import { generatePaymentLink } from "@/pages/api/payment/paymentApi";
function CheckoutPaymentPageDesktop() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [couponCode, setCouponCode] = useState(""); // کد تخفیف
  const [responseMessage, setResponseMessage] = useState(""); // پیام پاسخ
  const [loading, setLoading] = useState(false); // وضعیت لودینگ
  const checkout = useSelector((state) => state.app.checkout);
  const [paymentLink, setPaymentLink] = useState("");
  const token = Cookies.get("token");
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // تنظیم مقدار پیش‌فرض برای روش پرداخت و روش ارسال
    if (checkout) {
      setSelectedMethod(checkout.payment_method?._id || "");
      setSelectedShippingMethod(checkout.shipping_method?._id || "");
    }
  }, [checkout]);

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
    const fetchPaymentLink = async () => {
      try {
        const data = await generatePaymentLink(token);
    
        if (data) {
          setPaymentLink(data);
        } else {
          throw new Error('No payment link in response');
        }
      } catch (error) {
        console.error("Error generating payment link:", error);
        toast.error("خطا در دریافت لینک پرداخت");
      }
    };
    

    fetchPaymentLink();
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
      await updateShippingMethod(methodId, token);
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
    if (responseMessage) {
      setResponseMessage(""); // پاک کردن پیام پاسخ در صورت وجود پیام
    }
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
  const handleDeleteCoupon = async () => {
    setLoading(true); // شروع لودینگ
    try {
      await deleteCoupon(token); // فراخوانی تابع حذف کوپن
      setCouponCode(""); // پاک کردن کد تخفیف
      setResponseMessage("کوپن تخفیف با موفقیت حذف شد");
      fetchData(dispatch, setLoading); // به‌روزرسانی داده‌های صفحه پس از حذف کوپن
    } catch (error) {
      setResponseMessage(`خطا در حذف کوپن تخفیف: ${error.message}`);
      console.error("Error deleting coupon:", error);
    }
    setLoading(false); // پایان لودینگ
  };

  return (
    <Box
      maxWidth={"85%"}
      margin={"auto"}
      p={3}
      sx={{ fontFamily: "iran-sans", direction: "rtl" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "10px 20px",
          marginBottom: "20px",
          fontFamily: "iran-sans",
        }}
      >
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
        <Typography
          textAlign={"center"}
          width={"90%"}
          variant="h6"
          sx={{ color: "red", fontFamily: "iran-sans", fontWeight: "bold" }}
        >
          فروشگاه آنلاین مانترا
        </Typography>
      </Box>
      <Box container spacing={2} display={"flex"} gap={2}>
        {/* بخش سمت راست - روش های پرداخت */}
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
              textAlign: "right",
              fontFamily: "iran-sans",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "iran-sans",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 20px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  />
                  {/* <Divider /> */}
                </Box>
              ))}
            </RadioGroup>
          </Box>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
              textAlign: "right",
              fontFamily: "iran-sans",
            }}
          >
            {/* <Box display={"flex"} flexDirection={"column"}>
              <Box> */}
            <Typography
              variant="h6"
              sx={{
                fontFamily: "iran-sans",
                fontWeight: "bold",
                marginBottom: "18px",
              }}
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
                </Box>
              ))}
            </RadioGroup>

            {/* </Box>
            </Box> */}
          </Box>
          <Box
            sx={{
              padding: "10px 20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
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
              می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان
              یک کد وارد کنید.
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
                        {(couponCode ||
                    checkout?.coupon_targets?.products?.length > 0 ||
                    checkout?.coupon_targets?.categories?.length > 0) && (
                    <IconButton onClick={handleDeleteCoupon} disabled={loading}>
                      {loading ? <Loader /> : <DeleteIcon  sx={{color:'red'}}/>}
                    </IconButton>
                  )}
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
                  }}
                >
                  {responseMessage}
                </Typography>
              )}
            </Collapse>
          </Box>
        </Box>

        {/* بخش سمت چپ - خلاصه پرداخت */}
        <Grid item xs={12} md={4} width={"30%"}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: 2,
              bgcolor: "#f9f9f9",
              textAlign: "center",
              fontFamily: "iran-sans",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "iran-sans",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              خلاصه پرداخت
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
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
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
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
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
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
            <Divider sx={{ my: 2 }} />
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
                {checkout?.overall_basket_price?.toLocaleString()} تومان
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#000",
                fontFamily: "iran-sans",
                fontWeight: "bold",
              }}
              href={paymentLink} // لینک پرداخت را به دکمه پرداخت متصل کنید
              disabled={!paymentLink || loading} 
            >
              پرداخت
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default CheckoutPaymentPageDesktop;
