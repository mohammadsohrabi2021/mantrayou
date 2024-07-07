import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  Tab,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { TabContext, TabList } from "@mui/lab";
import Cookies from "js-cookie"; // نیاز به نصب js-cookie دارید
import BannerLoginPage from "@/components/module/BannerLoginPage";
import Link from "next/link";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";

function Login() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      otp: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [timer, setTimer] = useState(180);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); // افزودن وضعیت برای ذخیره شماره تلفن
  const BASE_URL = "https://api.mantrayou.com/client";
const router=useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPhoneNumber = localStorage.getItem('phoneNumber');
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
        setValue("phone", storedPhoneNumber);
        setIsCodeSent(true);
        setIsPhoneInputDisabled(true);
      }
    }
  }, [setValue]);

  useEffect(() => {
    let interval;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer <= 0) {
      const storedPhoneNumber = localStorage.getItem('phoneNumber');
      setPhoneNumber(storedPhoneNumber);
      setValue("phone", storedPhoneNumber);
      // setIsCodeSent(false);
      setIsPhoneInputDisabled(false);
      toast.warning("زمان دریافت کد OTP به پایان رسیده است");
    }

    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const sendOTP = async () => {
    setLoading(true);
    const phone = watch("phone");
   
    try {
      const response = await axios.post(`${BASE_URL}/login/send_sms_otp/`, {
        phone_number: phone,
      });

      if (response?.status == 200) {
        setIsCodeSent(true);
        setIsPhoneInputDisabled(true);
        setPhoneNumber(phone); // ذخیره شماره تلفن در وضعیت
        if (typeof window !== 'undefined') {
          localStorage.setItem('phoneNumber', phone); // ذخیره شماره تلفن در localStorage
        }
        setTimer(180);
        setValue("phone", phone); // مقدار فرم را به‌روزرسانی کنید
        reset({ otp: "" }); // پاک کردن فیلد OTP پس از ارسال موفقیت‌آمیز
        toast.success(response?.data?.msg);
      } else {
        toast.warning("کد OTP ارسال نشد");
      }
    } catch (error) {
      console.error("Failed to send OTP", error);
      toast.error(
        `ارسال کد OTP ناموفق بود ${error?.response?.data?.detail?.fa}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);
    if (loginType === "email") {
      try {
        const response = await axios.post(
          `${BASE_URL}/login`,
          {
            username: data.email,
            password: data.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response?.status == 200) {
          toast.success("ورود با ایمیل موفقیت‌آمیز بود");
          Cookies.set("token", response.data.access_token);
          router.push('/profile')
        } else {
          toast.warning("ورود با ایمیل موفقیت‌آمیز نبود");
        }
      } catch (error) {
        console.error("Login failed:", error?.response?.data?.detail?.fa);
        toast.error(
          `ورود با ایمیل ناموفق بود ${error?.response?.data?.detail?.fa}`
        );
      } finally {
        setLoading(false);
      }
    } else if (loginType === "phone") {
      if (!isCodeSent) {
        await sendOTP(data.phone);
      } else {
        try {
          
          const response = await axios.post(
            `${BASE_URL}/login_otp`,
            {
              username: phoneNumber,
              password: data?.otp,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (response?.status == 200) {
            Cookies.set("token", response.data.access_token);
            toast.success("ورود با تلفن همراه موفقیت‌آمیز بود");
            router.push('/profile')
          } else {
            toast.warning("ورود با ایمیل موفقیت‌آمیز نبود");
          }
         
          if (typeof window !== 'undefined') {
            localStorage.removeItem('phoneNumber'); // حذف شماره تلفن از localStorage بعد از لاگین موفق
          }
        } catch (error) {
          console.error("Login with OTP failed:", error);
          toast.error(
            `ورود با تلفن همراه ناموفق بود ${error?.response?.data?.detail?.fa}`
          );
        } finally {
          setLoading(false);
        }
      }
    }
  };

  // مدیریت تغییر حالت لاگین
  const handleTabChange = (event, newValue) => {
    setLoginType(newValue);
    setIsCodeSent(false); // غیرفعال کردن ارسال کد OTP در تغییر حالت
    setIsPhoneInputDisabled(false); // فعال کردن اینپوت شماره تلفن در تغییر حالت
    setPhoneNumber(""); // پاک کردن شماره تلفن در تغییر حالت
    if (typeof window !== 'undefined') {
      localStorage.removeItem('phoneNumber'); // حذف شماره تلفن از localStorage
    }
    reset({ email: "", password: "", phone: "", otp: "" }); // پاک کردن مقادیر فرم
  };

  return (
    <Grid container height="100vh">
      <BannerLoginPage
        title={"        ورود به حساب کاربری"}
        discription={`   فقط در چند دقیقه با ما یک حساب کاربری ایجاد کنید و سفارشات گذشته و
        تحویل سفارشات فعلی را پیگیری کنید.`}
      />
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        style={{ height: "400px" }}
        mt={{ xs: -20, sm: -40, lg: -10 }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 400,
            height: 450,
            width: "100%",
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
            fontFamily={"iran-sans"}
            fontWeight={"bold"}
          >
            ورود به سیستم
          </Typography>

          <TabContext value={loginType}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange} // تغییر حالت لاگین
                aria-label="login type tabs"
              >
                <Tab
                  label="ورود با شماره تلفن"
                  value="phone"
                  sx={{ fontFamily: "iran-sans" }}
                />
                <Tab
                  label="ورود با ایمیل"
                  value="email"
                  sx={{ fontFamily: "iran-sans" }}
                />
              </TabList>
            </Box>

            <form onSubmit={handleSubmit(handleLogin)} noValidate>
              {loginType === "email" ? (
                <>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "ایمیل الزامی است",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "ایمیل نامعتبر است",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="ایمیل"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "رمز عبور الزامی است",
                      minLength: {
                        value: 6,
                        message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="رمز عبور"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <Controller
                    name="phone"
                    control={control}
                    rules={isPhoneInputDisabled?null:{ required: "شماره تلفن الزامی است" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={isPhoneInputDisabled ? phoneNumber : field.value} // استفاده از وضعیت برای پر کردن مقدار اینپوت
                        onChange={(e) => {
                          setValue("phone", e.target.value||phoneNumber);
                          setPhoneNumber(e.target.value);
                          field.onChange(e);
                        }} // به‌روزرسانی مقدار در فرم و وضعیت
                        placeholder="شماره تلفن"
                        fullWidth
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        disabled={isPhoneInputDisabled} // غیرفعال کردن اینپوت شماره تلفن
                      />
                    )}
                  />
                  {isCodeSent && (
                    <>
                      <Controller
                        name="otp"
                        control={control}
                        rules={{ required: "کد تایید الزامی است" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="کد تایید"
                            fullWidth
                            error={!!errors.otp}
                            helperText={errors.otp?.message}
                          />
                        )}
                      />
                      <Button
                        onClick={sendOTP}
                        disabled={timer > 0}
                        sx={{ mt: 2, mb: 2 }}
                      >
                        {timer > 0
                          ? `ارسال مجدد کد (${timer} ثانیه)`
                          : "ارسال مجدد کد"}
                      </Button>
                    </>
                  )}
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "ورود "
                )}
              </Button>
            </form>
          </TabContext>
          <Grid container justifyContent="space-between" mt={2}>
            <Link href="/Register">
              <Button sx={{ color: "green", fontFamily: "iran-sans" }}>
                ثبت نام کنید
              </Button>
            </Link>
            <Button sx={{ color: "red", fontFamily: "iran-sans" }}>
              فراموشی رمز عبور
            </Button>
          </Grid>
        </Paper>
      </Grid>
     
    </Grid>
  );
}

export default Login;
