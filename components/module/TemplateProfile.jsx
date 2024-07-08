import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  Divider,
  Paper,
  CircularProgress,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { dataInput, dataMuneItem } from "@/Data/DataInputProfile";
import DynamicModal from "./DynamicModal";
import { saveOpenDialogCheckMethod } from "@/redux/appSlice";

function TemplateProfile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedSection, setSelectedSection] = useState("accountOverview");
  const dataUser = useSelector((state) => state.app.userInfo);
  const [firstName, lastName] = dataUser.full_name.split("-");
  const onSubmit = (data) => {
    console.log(data);
  };
  const dispatch = useDispatch();
  const openDialog = useSelector((state) => state.app.openDialog);

  const handleOpenDialog = () => {
    dispatch(saveOpenDialogCheckMethod(!openDialog));
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "accountOverview":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={'iran-sans'} color={'gray'} fontWeight="bold">
             اطلاعات  حساب من
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography fontFamily={'iran-sans'} lineHeight={3} color="textSecondary">
                نام
              </Typography>
              <Typography fontFamily={'iran-sans'}color={'blue'}>{firstName}</Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography fontFamily={'iran-sans'} lineHeight={3} color="textSecondary">
                نام خانوادگی
              </Typography>
              <Typography fontFamily={'iran-sans'}color={'blue'}>{lastName}</Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography fontFamily={'iran-sans'} lineHeight={3} color="textSecondary">
                ایمیل
              </Typography>
              <Typography fontFamily={'iran-sans'}color={'blue'}>{dataUser.email}</Typography>
            </Box>
            <Button variant="outlined" sx={{ marginTop: 4 }}>
              بازنشانی رمز عبور
            </Button>
          </Box>
        );
      case "myAddresses":
        return (
          <Box display={"flex"} justifyContent={'space-between'} sx={{ padding: 2 }}>
            <Box width={'50%'}>
              <Typography fontFamily={'iran-sans'} fontWeight="bold">
              آدرس جدید
              </Typography>
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
                        borderColor: errors.additional_notes
                          ? "red"
                          : "inherit",
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
            </Box>
            <Box width={'50%'}>
                <Typography  pr={2}  fontFamily={'iran-sans'} textAlign={'right'}>آدرس های من</Typography>
                <Grid display={'flex'} justifyContent={'center'} alignItems={'ceneter'}>
                    <Typography fontFamily={'iran-sans'} color={'red'}>بدون ادرس</Typography>
                </Grid>
            </Box>
          </Box>
        );
      case "orders":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={'iran-sans'} color={'gray'}pb={3} fontWeight="bold">
              سفارشات من
            </Typography>
            <Typography textAlign={'center'} fontFamily={'iran-sans'} color="red">
              بدون سفارش
            </Typography>
          </Box>
        );
      case "mantraClub":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={'iran-sans'} pb={3} color={'gray'} fontWeight="bold">
              کلوب مانترا
            </Typography>
            <Typography fontFamily={'iran-sans'} textAlign={'center'} color="red">
              هیچ رکوردی برای شما وجود ندارد
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ paddingBottom: 2 }}>
            <Typography fontFamily={"iran-sans"} fontWeight="bold" textAlign={'center'} color={'green'}>
              سلام، {firstName} جان خوش آمدی
            </Typography>
          </Box>
          <Divider />
          <List>
            {dataMuneItem.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => setSelectedSection(item.value)}
                selected={selectedSection === item.value}
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="body1" fontFamily={'iran-sans'} fontSize={'14px'} color={selectedSection === item.value&&'gray'}> {item.title} </Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button sx={{color:'red'}} onClick={handleOpenDialog}>
              <LogoutIcon sx={{ marginLeft: 1 }} />
              <Typography fontFamily={'iran-sans'}>خروج</Typography>
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          {renderContent()}
        </Paper>
      </Grid>
     
    </Grid>
  );
}

export default TemplateProfile;
