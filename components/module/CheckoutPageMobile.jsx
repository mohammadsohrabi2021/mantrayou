import React, { useState } from "react";
import { Box, Typography, Button, List, Grid } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector } from "react-redux";
import ProductCardCheckOut from "./ProductCardCheckOut";
import logoPost from "../../assets/images/logoPost.png";
import Image from "next/image";
import Link from "next/link";
import AddressModalCheckOut from "./AddressModalCheckOut";
function CheckoutPageMobile() {
  const checkout = useSelector((state) => state.app.checkout);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
      <Button
        variant="text"
        startIcon={<ArrowForwardIcon />}
        sx={{
          color: "black",
          width: "max-content",
          textTransform: "none",
          fontFamily: "iran-sans",
          fontWeight: 700,
          gap: 1,
          fontSize: "12px",
        }}
      >
        آدرس و زمان ارسال
      </Button>
      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />
      <Box display={"flex"} flexDirection={"column"} px={3} py={2}>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <FmdGoodIcon style={{ color: "#81858b" }} />
          <Box>
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
              fontSize={"12px"}
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
          sx={{
            fontFamily: "iran-sans",
            justifyContent: "flex-end",
            color: "#19bfd3",
            fontSize: "12px",
            gap: 1,
          }}
          onClick={handleOpenModal}
        >
          تغییر یا ویرایش آدرس
        </Button>
      </Box>
      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />
      <Box border={"1px solid #e0e0e2"} borderRadius={"8px"} m={2} p={2}>
        <Box display={"flex"} alignItems={"center"} gap={2} mb={1}>
          <Image
            width={36}
            height={36}
            src={logoPost}
            alt={checkout?.items?.name}
          />
          <Grid>
            <Typography
              lineHeight={2.1}
              color={"#23254e"}
              fontWeight={700}
              fontSize={"14px"}
              fontFamily={"iran-sans"}
            >
              ارسال پستی
            </Typography>
            <Typography
              fontSize={"10px"}
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
        <Typography fontFamily={'iran-sans'} fontWeight={400} lineHeight={2.17} fontSize={'9px'}>زمان تحویل: زمان تقریبی تحویل از ۲۰ مرداد تا ۲۷ مرداد</Typography>
       <Box display={'flex'} gap={2}>
       <Typography fontFamily={'iran-sans'} fontWeight={400} lineHeight={2.17} fontSize={'9px'}>هزینه ارسال  </Typography>
        <Typography color={'#23254e'} fontFamily={'iran-sans'} fontWeight={700} lineHeight={2.15} fontSize={'11px'}>رایگان</Typography>
       </Box>
      </Box>

      <Box sx={{ my: 1, height: "8px", bgcolor: "#f0f0f1" }} />

      <Box p={2}>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"iran-sans"}
            color={"#62666d"}
            fontSize={"12px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            قیمت کالاها (۶)
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            color={"#62666d"}
            fontSize={"12px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            ۱۵,۲۲۳,۰۰۰ تومان
          </Typography>
        </Grid>
        <Box sx={{ my: 1, height: "1px", bgcolor: "#f0f0f1" }} />
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"iran-sans"}
            fontSize={"12px"}
            color={"#23254e"}
            fontWeight={700}
            lineHeight={2.17}
          >
            هزینه ارسال
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            fontSize={"12px"}
            color={"#23254e"}
            fontWeight={700}
            lineHeight={2.17}
          >
            رایگان
          </Typography>
        </Grid>
        <Box sx={{ my: 1, height: "1px", bgcolor: "#f0f0f1" }} />
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"iran-sans"}
            color={"#62666d"}
            fontSize={"12px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            قابل پرداخت
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            color={"#62666d"}
            fontSize={"12px"}
            lineHeight={2.17}
            fontWeight={700}
          >
            ۱۵,۲۲۳,۰۰۰ تومان
          </Typography>
        </Grid>
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
        <Link href={'/checkout/payment'}>
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
            {" "}
            جمع سبد خرید
          </Typography>
          <Typography
            fontFamily={"iran-sans"}
            lineHeight={2.15}
            fontWeight={400}
            fontSize={"12px"}
          >
            {" "}
            ۱۵,۲۲۳,۰۰۰ تومان
          </Typography>
        </Grid>
      </Box>
      <AddressModalCheckOut open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
}

export default CheckoutPageMobile;
