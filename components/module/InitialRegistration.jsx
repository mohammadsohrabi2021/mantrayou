import {
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CustomTextField } from "../style/CustomTextField";
import Link from "next/link";

function InitialRegistration({
  handleSubmit,
  onSubmit,
  control,
  errors,
}) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    await onSubmit(data);
    setLoading(false);
  };
  

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
      <Typography my={2} fontFamily={"iran-sans"} fontSize={'18px'} fontWeight={"bold"}>
        ثبت نام حساب کاربری
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid display={"flex"} flexDirection={{xs:'column',sm:'row'}} gap={{xs:0,sm:3}}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "لطفا نام خود را وارد کنید" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                placeholder="نام*"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "لطفا نام خانوادگی خود را وارد کنید" }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                placeholder="نام خانوادگی*"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                margin="normal"
              />
            )}
          />
        </Grid>

        <Grid display={"flex"} flexDirection={{xs:'column',sm:'row'}} gap={{xs:0,sm:3}}>
          <Controller
            name="birthday"
            control={control}
            rules={{ required: "لطفا تاریخ تولد خود را وارد کنید" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={(date) => field.onChange(date.toDate())} // تبدیل تاریخ انتخابی به شیء Date معمولی
                value={field.value ? new Date(field.value) : null} // تنظیم مقدار DatePicker
                render={
                  <CustomTextField
                    placeholder="تاریخ تولد"
                    fullWidth
                    margin="normal"
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                  />
                }
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "لطفا یک پسورد  وارد کنید",
              minLength: {
                value: 6,
                message: "رمز عبور باید حداقل 6 کاراکتر باشد",
              },
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                placeholder="رمز عبور*"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
              />
            )}
          />
        </Grid>
        <Grid display={"flex"} flexDirection={{xs:'column',sm:'row'}} gap={{xs:0,sm:3}}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "شماره تلفن خود را وارد کنید",
              minLength: {
                value: 11,
                message: "تلفن باید حداقل 11 کاراکتر داشته باشد",
              },
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                placeholder="شماره تلفن*"
                type="phone"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "لطفا ایمیل خود را وارد کنید",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                placeholder="ایمیل*"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
              />
            )}
          />
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} sx={{color:"#fff"}}/> : "ثبت نام"}
        </Button>
      </form>
      <Grid container gap={1} alignItems={'center'} mt={2}>
        <Typography fontFamily={'iran-sans'}fontSize={'12px'} color={'gray'}>آیا از قبلا حساب کاربری خود را ساخته ای؟</Typography>
           <Link href={'/login'}>
           <Button
              sx={{ color: "green", fontFamily: "iran-sans" }}
            >
              ورود به حساب کاربری
            </Button></Link>
          </Grid>
    </Paper>
  );
}

export default InitialRegistration;
