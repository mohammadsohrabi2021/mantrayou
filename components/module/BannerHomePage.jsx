import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CustomButton } from "../style/CustomButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomTextField } from "../style/CustomTextField";
import { registerNewsletter } from "@/pages/api/newsletter/newsletterApi";

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
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  // hoverTextColor,
  borderColor,
}) {
  const matches = useMediaQuery("(max-width:600px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async(data) => {
    try {
      const response= await registerNewsletter(data);
      if (response?.status) {
        toast.success(response?.detail?.fa, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset(); 
      }
   
    } catch (error) {
      const errorDetail = JSON.parse(error.message);
      const errorMessage = errorDetail.detail.fa || "خطا در ارسال فرم";
      toast.error(errorMessage,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
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
        <Image
          src={image}
          style={{
            width: title === "معاملات خبرنامه" ? "50%" : "70%",
            height: "100%",
          }}
        />
      )}

      <Grid
        display={display}
        px={2}
        flexDirection={flexDirectionBoxText}
        justifyContent={justifyContent}
        alignItems={alignItems}
        py={{ xs: 2, sm: 0 }}
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
          textAlign={"center"}
          mb={{ xs: 1, md: 3 }}
        >
          {discription}
        </Typography>
        {/* <Grid width={"100%"}> */}
          {title === "معاملات خبرنامه" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <CustomTextField
                  {...register("full_name", {
                    required: "نام و نام خانوادگی الزامی است",
                  })}
                  placeholder="نام و نام خانوادگی"
                  style={{ width: "100%", padding: "8px", marginBottom: "4px" }}
                />
                {errors.full_name && (
                  <Typography
                    color={"red"}
                    fontFamily={"iran-sans"}
                    fontSize={"12px"}
                  >
                    {errors.full_name.message}
                  </Typography>
                )}
              </Box>
              <Box mb={2}>
                <CustomTextField
                  {...register("email", {
                    required: "ایمیل الزامی است",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "ایمیل معتبر وارد کنید",
                    },
                  })}
                  placeholder="ایمیل"
                  style={{ width: "100%", padding: "8px", marginBottom: "4px" }}
                />
                {errors.email && (
                  <Typography
                    color={"red"}
                    fontFamily={"iran-sans"}
                    fontSize={"12px"}
                  >
                    {errors.email.message}
                  </Typography>
                )}
              </Box>
              <Box mb={2}>
                <Grid display={'flex'} alignItems={'start'} justifyContent={'center'}gap={2} >
                  <input
                    {...register("terms", {
                      required: "تایید قوانین الزامی است",
                    })}
                    type="checkbox"
                    style={{margin:'5px 0 0 0', width:'20px',height:'20px',cursor:'pointer'}}
                  />
                 <Typography fontFamily={'iran-sans'} fontSize={'14px'} color={'gray'}  lineHeight={2}> با ثبت نام در خبرنامه، موافقت می کنم که داده های من مطابق با
                  سیاست حفظ حریم خصوصی پردازش شود. من می توانم رضایت خود را در
                  هر زمانی لغو کنم، به عنوان مثال. با کلیک بر روی لینک لغو
                  اشتراک در خبرنامه.</Typography>
                </Grid>
                {errors.terms && (
                  <Typography
                    color={"red"}
                    fontFamily={"iran-sans"}
                    fontSize={"12px"}
                  >
                    {errors.terms.message}
                  </Typography>
                )}
              </Box>

              <CustomButton
                bgColor={bgColor}
                textColor={textColor}
                hoverBgColor={hoverBgColor}
                hoverTextColor={hoverTextColor}
                borderColor={borderColor}
                variant="outlined"
                type="submit"
              >
                {textButton}
              </CustomButton>
            </form>
          )}
        {/* </Grid> */}
        {title === "معاملات خبرنامه" ? null : (
          <CustomButton
            bgColor={bgColor}
            textColor={textColor}
            hoverBgColor={hoverBgColor}
            hoverTextColor={hoverTextColor}
            borderColor={borderColor}
            variant="outlined"
          >
            {textButton}
          </CustomButton>
        )}
      </Grid>
    </Grid>
  );
}

export default BannerHomePage;
