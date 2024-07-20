import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { CustomTextField } from "../style/CustomTextField";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";

function PhoneNumberConfirmation() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();
  const [showSMSValidation, setShowSMSValidation] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false); // state برای مدیریت وضعیت بارگذاری
  const phone = watch("phone");
const router =useRouter()
  const handlePhoneSubmit = async (data) => {
    const phoneData = data?.phone || getValues("phone");
    setLoading(true); // شروع بارگذاری
    try {
      const response = await axios.post(
        "https://api.mantrayou.com/client/registration/sms/send",
        { phone_number: phoneData }
      );
      if (response?.statusText === "OK") {
        setShowSMSValidation(true);
        toast.success("پیامک با موفقیت ارسال شد!");
        setResendTimer(180); // 3 minutes timer
      }
    } catch (error) {
      console.error("SMS sending failed:", error?.response?.status);
      if (error?.response?.status==403) {
        toast.warning(`ارسال پیامک ناموفق بود. ${error?.response?.data?.detail?.fa}`);
      }
     else{
      toast.error(`ارسال پیامک ناموفق بود. ${error?.response?.data?.detail?.fa}`);
     }
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  const handleSMSValidation = async (data) => {
    setLoading(true); // شروع بارگذاری
    try {
      const response = await axios.post(
        `https://api.mantrayou.com/client/registration/sms/validate`,
        { username: data.phone,password: data.code},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status==200) {
        toast.success(response.data.msg);
        router.push("/login"); // Redirect to login page
      } else {
        toast.error("تأیید  ناموفق بود.");
      }
    } catch (error) {
      console.error("SMS validation failed:", error.response?.data);
      toast.error(`تأیید پیامک ناموفق بود. ${error.response?.data?.detail?.fa}`);
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };


  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 500,
        height: "auto",
        width: "100%",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <Typography color={"green"} fontFamily={"iran-sans"}>
        خوش آمدید!
      </Typography>

      {!showSMSValidation && (
        <form onSubmit={handleSubmit(handlePhoneSubmit)}>
          <Grid>
            <Typography
              my={2}
              color={"gray"}
              fontSize={"14px"}
              fontFamily={"iran-sans"}
            >
              لطفاً شماره تلفن خود را وارد کنید تا کد تاییدیه برای شما ارسال
              شود.
            </Typography>
            <CustomTextField
              type="text"
              placeholder="شماره تلفن*"
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{10,11}$/,
              })}
            />
            {errors.phone && (
              <Typography
                fontFamily={"iran-sans"}
                pt={1}
                fontSize={"12px"}
                color={"red"}
              >
                لطفاً یک شماره تلفن معتبر وارد کنید.
              </Typography>
            )}
          </Grid>
          <Button
            type="submit"
            disabled={resendTimer > 0 || loading}
            variant="contained"
            fullWidth
            sx={{ marginTop: "30px", fontFamily: "iran-sans" }}
          >
            {loading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="loading"
              />
            ) : resendTimer > 0 ? (
              `صبر کنید (${resendTimer})`
            ) : (
              "ارسال اس ام اس"
            )}
          </Button>
        </form>
      )}

      {showSMSValidation && (
        <form onSubmit={handleSubmit(handleSMSValidation)}>
          <Grid>
            <Typography
              my={2}
              color={"gray"}
              fontSize={"13px"}
              fontFamily={"iran-sans"}
            >
              لطفا کد تاییدیه ارسال شده به شماره تلفن خود را وارد کنید تا حساب
              کاربری شما تایید شود
            </Typography>
            <CustomTextField
              type="text"
              placeholder="کد تاییدیه"
              {...register("code", { required: true })}
            />
            {errors.code && (
              <Typography fontFamily={"iran-sans"}>
                لطفاً کد تاییدیه را وارد کنید.
              </Typography>
            )}
            <Button
              onClick={() => handlePhoneSubmit({ phone: getValues("phone") })}
              disabled={resendTimer > 0 || loading}
              variant="contained"
              fullWidth
              sx={{ marginTop: "30px", fontFamily: "iran-sans", backgroundColor: 'green' }}
            >
              {loading ? (
                <TailSpin
                  height="30"
                  width="30"
                  color="white"
                  ariaLabel="loading"
                />
              ) : resendTimer > 0 ? (
                `صبر کنید (${resendTimer})`
              ) : (
                "ارسال اس ام اس"
              )}
            </Button>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: "20px", fontFamily: "iran-sans" }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              "ارسال کد تاییدیه"
            )}
          </Button>
        </form>
      )}
    </Paper>
  );
}

export default PhoneNumberConfirmation;
