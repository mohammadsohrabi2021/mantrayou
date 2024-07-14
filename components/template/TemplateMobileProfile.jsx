import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  IconButton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { dataInput } from "@/Data/DataInputProfile";
import Cookies from "js-cookie";
import AddressCard from "../module/AddressCard";
import { toast } from "react-toastify";
import useEmailEdit from "@/hooks/useEmailEdit";
import useProfileEdit from "@/hooks/useProfileEdit";
import { postAddressesUser } from "@/pages/api/account/accountApi";
import useBirthdayInfo from "@/hooks/useGregorianToJalali";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

function TemplateMobileProfile({ handleOpenDialog, fetchUserAddressesData, fetchUserData }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // اضافه کردن setValue از react-hook-form
  } = useForm();
  const [expanded, setExpanded] = useState(false);
  const userAdresses = useSelector((state) => state.app.addressesUser);
  const dataUser = useSelector((state) => state.app.userInfo);
  const [firstName, lastName] = dataUser.full_name.split("-");

  const {
    email,
    isEditingEmail,
    setEmail,
    handleEditEmail,
    handleEmailChange
  } = useEmailEdit(dataUser.email, fetchUserData);

  const {
    firstName: editFirstName,
    lastName: editLastName,
    birthday,
    isEditing,
    setFirstName,
    setLastName,
    setBirthday,
    handleEditProfile,
    handleProfileChange
  } = useProfileEdit({ firstName, lastName, birthday: dataUser.birthday }, fetchUserData);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    const resData = await postAddressesUser(token, data, dataUser);
    if (resData?.status) {
      fetchUserAddressesData();
      toast.success(
        `${firstName} ${lastName} عزیز آدرس تو با موفقیت به لیست آدرس هات اضافه شد`
      );
    }
    reset({});
  };

  const { jalaliDateStr, daysUntilBirthday } = useBirthdayInfo(birthday); // استفاده از هوک با مقدار birthday از پروفایل

  return (
    <>
      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="box-shadow"
        p={1}
        borderRadius={1}
        mb={2}
      >
        <Typography fontFamily={"iran-sans"} fontWeight="bold">
          سلام، {firstName}
        </Typography>
        <Button
          sx={{
            fontFamily: "iran-sans",
            color: "red",
            gap: 1,
            borderColor: "red",
          }}
          variant="outlined"
          onClick={handleOpenDialog}
        >
          <LogoutIcon /> خروج
        </Button>
      </Grid>
      <Grid className="box-shadow">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontFamily={"iran-sans"} fontWeight="bold">
              نمای کلی حساب
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" color="textSecondary">
                نام
              </Typography>
              <Box display="flex" alignItems="center">
                {isEditing ? (
                  <TextField
                    value={editFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{firstName}</Typography>
                )}
              </Box>

              <Typography variant="body2" color="textSecondary">
                نام خانوادگی
              </Typography>
              <Box display="flex" alignItems="center">
                {isEditing ? (
                  <TextField
                    value={editLastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography variant="body1">{lastName}</Typography>
                )}
              </Box>

              <Typography variant="body2" color="textSecondary" my={2}>
                تاریخ تولد
              </Typography>
              <Box display="flex" alignItems="center">
                {isEditing ? (
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={birthday}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(date) => {
                          field.onChange(date.toDate());
                          setValue("birthday", date.toDate()); // تنظیم مقدار birthday در react-hook-form
                          setBirthday(date.toDate()); // به روز رسانی مقدار birthday در هوک useProfileEdit
                        }}
                        value={field.value ? new Date(field.value) : null} // تنظیم مقدار DatePicker
                        render={
                          <TextField
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
                ) : (
                  <Grid display={'flex'} flexDirection={'column'} gap={2}> 
                    <Typography variant="body1">{jalaliDateStr}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {daysUntilBirthday} روز مانده تا زادروز
                    </Typography>
                  </Grid>
                )}
              </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" color="textSecondary">
                ایمیل
              </Typography>
              <Box display="flex" alignItems="center">
                {isEditingEmail ? (
                  <>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                    />
                    <Button onClick={handleEmailChange} variant="contained">ذخیره</Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1">{dataUser.email}</Typography>
                    <IconButton onClick={handleEditEmail}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="outlined"
                sx={{ height: "max-content" }}
                onClick={isEditing ? handleProfileChange : handleEditProfile}
              >
                {isEditing ? 'ذخیره' : 'ویرایش اطلاعات'}
              </Button>
            </Box>
            <Button
              variant="outlined"
              sx={{ marginTop: 2, height: "max-content" }}
            >
              بازنشانی رمز عبور
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontFamily={"iran-sans"} fontWeight="bold">
              آدرس های من
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit(onSubmit)}>
              {dataInput.map((item) => (
                <Controller
                  key={item.id}
                  name={item.name}
                  control={control}
                  defaultValue=""
                  rules={{ required: `${item.required}` }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder={item.lable}
                      fullWidth
                      margin="normal"
                      error={!!errors[item.name]}
                      helperText={
                        errors[item.name] ? errors[item.name].message : ""
                      }
                    />
                  )}
                />
              ))}

              <Controller
                name="additional_notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    minRows={3}
                    placeholder="یادداشت‌های اضافی"
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      padding: "8px",
                      borderColor: errors.additional_notes ? "red" : "inherit",
                    }}
                  />
                )}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                ذخیره
              </Button>
            </form>
            <Grid
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={{ xs: "column", sm: "row" }}
              gap={{ xs: 0, sm: 2 }}
              mt={2}
              flexWrap={'wrap'}
            >
              {userAdresses?.length > 0 ? (
                <>
                  {userAdresses.map((item) => (
                    <AddressCard key={item?._id} {...item} />
                  ))}
                </>
              ) : (
                <Typography fontFamily={"iran-sans"} color={"red"}>
                  بدون ادرس
                </Typography>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleAccordionChange("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontFamily={"iran-sans"} fontWeight="bold">
              سفارشات من
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              fontFamily={"iran-sans"}
              fontSize={"14px"}
              color={"red"}
            >
              بدون سفارش
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleAccordionChange("panel4")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontFamily={"iran-sans"} fontWeight="bold">
              کلوب مانترا
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              fontFamily={"iran-sans"}
              fontSize={"14px"}
              color={"red"}
            >
              هیچ رکوردی برای شما وجود ندارد{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}

export default TemplateMobileProfile;
