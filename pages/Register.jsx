import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Snackbar,
} from "@mui/material";
import BannerLoginPage from "@/components/module/BannerLoginPage";
import axios from "axios";
import InitialRegistration from "@/components/module/InitialRegistration";
import { toast } from "react-toastify";
import PhoneNumberConfirmation from "@/components/module/PhoneNumberConfirmation";

function Register() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: null,
      email: "",
      password: "",
      phone: "",
    },
  });
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const BASE_URL = "https://api.mantrayou.com/client";
  const onSubmit = async (data) => {

    const year = data.birthday.getFullYear();
    const month = data.birthday.getMonth() + 1; // اضافه کردن 1 برای نمایش ماه به صورت عددی معمولی
    const day = data.birthday.getDate();
    try {
      const response = await axios.post(`${BASE_URL}/registration/create`, {
        email: data.email,
        password: data.password,
        full_name: `${data.firstName}-${data.lastName}`,
        birthday: `${year}-${
          month.toString().length > 1 ? month : `0${month}`
        }-${day.toString().length > 1 ? day : `0${day}`}`,
        phone_number: data.phone,
      });

      if (response?.statusText === "Created") {
        setShowPhoneVerification(true);
        toast.success("ثبت نام اولیه شما با موفقیت انجام شد");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`ثبت نام انجام نشد ,${error?.response?.data?.detail?.fa}`);
    }
  };

  return (
    <Grid container height="100vh" mb={40}>
      <BannerLoginPage
        title={"ثبت نام حساب کاربری"}
        discription={
          "فقط در چند دقیقه با ما یک حساب کاربری ایجاد کنید و سفارشات گذشته و تحویل سفارشات فعلی را پیگیری کنید."
        }
      />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{ height: "400px" }}
        // mt={{ xs: -20, md: -40, lg: -10 }}
      >
        {showPhoneVerification ? (
          <Grid mt={{ xs: -30,sm:-60, lg: -30 }}>
            <PhoneNumberConfirmation />
          </Grid>
        ) : (
          <Grid mt={{ xs: -10,sm:-80, md: -40, lg: -10 }}>
            <InitialRegistration
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              control={control}
              errors={errors}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Register;
