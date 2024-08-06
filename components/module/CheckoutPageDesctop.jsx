import React, { useState } from "react";
import { Box, Grid, Typography, Button, Divider, List } from "@mui/material";
import logoPost from "../../assets/images/logoPost.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import ProductCardCheckOut from "./ProductCardCheckOut";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Image from "next/image";
import Link from "next/link";
import AddressModalCheckOut from "./AddressModalCheckOut";
function CheckoutPageDesctop() {
  const checkout = useSelector((state) => state.app.checkout);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
        <Link href={"/"}>
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
            آدرس و زمان ارسال
          </Button>
        </Link>
        <Typography
          textAlign={"center"}
          width={"85%"}
          variant="h6"
          sx={{ color: "red", fontFamily: "iran-sans", fontWeight: "bold" }}
        >
          فروشگاه آنلاین مانترا
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        display={"flex"}
        flexDirection={"row-reverse"}
      >
        {/* بخش چپ */}
        <Grid item xs={12} md={4}>
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
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontFamily={"iran-sans"}
                color={"#62666d"}
                fontSize={"14px"}
                lineHeight={2.17}
              >
                قیمت کالاها
              </Typography>
              <Typography
                fontFamily={"iran-sans"}
                color={"#62666d"}
                fontSize={"14px"}
                lineHeight={2.17}
                fontWeight={700}
              >
                ۱۵,۳۲۳,۰۰۰ تومان
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography
                fontFamily={"iran-sans"}
                fontSize={"14px"}
                color={"#23254e"}
                fontWeight={700}
                lineHeight={2.17}
              >
                هزینه ارسال
              </Typography>
              <Typography
                fontFamily={"iran-sans"}
                fontSize={"16px"}
                color={"#23254e"}
                fontWeight={700}
                lineHeight={2.17}
              >
                رایگان
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
                color={"#62666d"}
                fontSize={"14px"}
                lineHeight={2.17}
                fontWeight={700}
              >
                قابل پرداخت:
              </Typography>
              <Typography
                fontFamily={"iran-sans"}
                color={"#62666d"}
                fontSize={"14px"}
                lineHeight={2.17}
                fontWeight={700}
              >
                ۱۵,۳۲۳,۰۰۰ تومان
              </Typography>
            </Box>
            <Link href={"/checkout/payment"}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "#000",
                  fontFamily: "iran-sans",
                }}
              >
                ثبت سفارش
              </Button>
            </Link>
          </Box>
        </Grid>

        {/* بخش راست */}
        <Grid item xs={12} md={8}>
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
            <Box display={"flex"} flexDirection={"column"} px={3} py={2}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <FmdGoodIcon style={{ color: "#81858b" }} />
                <Box display={"flex"} flexDirection={"column"} gap={1}>
                  <Typography
                    fontFamily={"iran-sans"}
                    fontWeight={400}
                    lineHeight={2.17}
                    color={"#81858b"}
                    fontSize={"12px"}
                  >
                    آدرس تحویل سفارش
                  </Typography>
                  <Typography
                    lineHeight={2.15}
                    color={"#000"}
                    fontSize={"14px"}
                    fontFamily={"iran-sans"}
                  >
                    {checkout?.address_info?.address_text}
                  </Typography>
                  <Typography
                    fontFamily={"iran-sans"}
                    fontWeight={400}
                    lineHeight={2.17}
                    color={"#81858b"}
                    fontSize={"12px"}
                  >
                    {checkout?.user_info?.full_name}
                  </Typography>
                </Box>
              </Box>
              <Button
                endIcon={<ArrowBackIosNewIcon style={{ fontSize: "10px" }} />}
                variant="text"
                onClick={handleOpenModal}
                sx={{
                  fontFamily: "iran-sans",
                  justifyContent: "flex-end",
                  color: "#19bfd3",
                  fontSize: "12px",
                  gap: 1,
                }}
              >
                تغییر یا ویرایش آدرس
              </Button>
            </Box>
          </Box>

          {/* <Box mb={2}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                justifyContent: "space-between",
                py: 1.5,
                fontFamily: "iran-sans",
              }}
            >
              آدرس و زمان ارسال
            </Button>
          </Box> */}

          <Box border={"1px solid #e0e0e2"} borderRadius={"8px"} p={4}>
            <Box display={"flex"} alignItems={"center"} gap={2} mb={1}>
              <Image
                width={46}
                height={46}
                src={logoPost}
                alt={checkout?.items?.name}
              />
              <Grid>
                <Typography
                  lineHeight={2.1}
                  color={"#23254e"}
                  fontWeight={700}
                  fontSize={"16px"}
                  fontFamily={"iran-sans"}
                >
                  ارسال پستی
                </Typography>
                <Typography
                  fontSize={"12px"}
                  color={"#62666d"}
                  fontWeight={400}
                  fontFamily={"iran-sans"}
                >
                  موجود در انبار
                </Typography>
              </Grid>
              <Typography></Typography>
            </Box>
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                padding: 0,
                margin: 0,
              }}
            >
              {checkout?.items?.map((product, index) => (
                <Box
                  key={product.product_id}
                  sx={{
                    flexGrow: 0,
                    flexShrink: 0,
                    flexBasis: "auto",
                    borderLeft:
                      index !== checkout.items.length - 1
                        ? "1px solid #e0e0e2"
                        : "none", // حذف خط برای آخرین محصول
                  }}
                >
                  <ProductCardCheckOut {...product} />
                </Box>
              ))}
            </List>
            <Typography
              fontFamily={"iran-sans"}
              fontWeight={400}
              lineHeight={2.17}
              fontSize={"12px"}
            >
              زمان تحویل: زمان تقریبی تحویل از ۲۰ مرداد تا ۲۷ مرداد
            </Typography>
            <Box display={"flex"} gap={2}>
              <Typography
                fontFamily={"iran-sans"}
                fontWeight={400}
                lineHeight={2.17}
                fontSize={"12px"}
              >
                هزینه ارسال{" "}
              </Typography>
              <Typography
                color={"#23254e"}
                fontFamily={"iran-sans"}
                fontWeight={700}
                lineHeight={2.15}
                fontSize={"14px"}
              >
                رایگان
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddressModalCheckOut open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
}

export default CheckoutPageDesctop;
