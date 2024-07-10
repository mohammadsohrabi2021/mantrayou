import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  CircularProgress,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import {
  getDataAccountAddressesUserId,
  getDataAccountUser,
  postAddressesUser,
} from "./api/account/accountApi";
import {
  saveAdressesUserInfoMethod,
  saveOpenDialogCheckMethod,
  saveUserInfoMethod,
} from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { dataInput, dataMuneItem } from "@/Data/DataInputProfile";
import TemplateProfile from "@/components/module/TemplateProfile";
import DynamicModal from "@/components/module/DynamicModal";
import { useRouter } from "next/router";
import { handleLogout } from "@/utils/handleLogout";
import { toast } from "react-toastify";
import AddressCard from "@/components/module/AddressCard";

function Profile() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(false);
  const userAdresses = useSelector((state) => state.app.addressesUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const openDialog = useSelector((state) => state.app.openDialog);
  const router = useRouter();
  const handleOpenDialog = () => {
    dispatch(saveOpenDialogCheckMethod(!openDialog));
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const resData = await getDataAccountUser(token);
      dispatch(saveUserInfoMethod(resData));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAddressesData = async () => {
      const token = Cookies.get("token");
      const resData = await getDataAccountAddressesUserId(token, dataUser);
      dispatch(saveAdressesUserInfoMethod(resData));
  };

  useEffect(() => {
    fetchUserData();
    fetchUserAddressesData();
  }, [saveAdressesUserInfoMethod,saveUserInfoMethod]);

  const dataUser = useSelector((state) => state.app.userInfo);

  if (loading) {
    return <CircularProgress />;
  }
  const [firstName, lastName] = dataUser.full_name.split("-");
  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    const resData = await postAddressesUser(token, data, dataUser);
    if (resData?.status) {
      fetchUserAddressesData();
      toast.success(`${firstName} ${lastName} عزیز آدرس تو با موفقیت به لیست آدرس هات اضافه شد`)
    }
    reset({});
  };
 
  return (
    <Grid container>
      <Grid item xs={12}>
        {isMobile ? (
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
                    <Typography variant="body1">{firstName}</Typography>

                    <Typography variant="body2" color="textSecondary">
                      نام خانوادگی
                    </Typography>
                    <Typography variant="body1">{lastName}</Typography>
                  </Box>
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      ایمیل
                    </Typography>
                    <Typography variant="body1">{dataUser.email}</Typography>
                  </Box>
                  <Button variant="outlined" sx={{ marginTop: 4 }}>
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
                  <Grid
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={{xs:'column',sm:'row'}}
                gap={{xs:0,sm:2}}
mt={2}
              >
                {userAdresses?.length > 0 ? (
                  <>
                    {userAdresses.map((item) => (
                      <AddressCard key={item?._id} {...item}/>
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
        ) : (
          <Grid width={"100%"}>
            <TemplateProfile />
          </Grid>
        )}
      </Grid>
      <DynamicModal
        open={openDialog}
        onClose={handleOpenDialog}
        title="خروج از حساب کاربری"
        description={`${firstName} عزیز  آیا واقعا قصد خروج از اکانت کاربری  خودت از سایت مانترا رو داری؟  `}
        onConfirm={() => handleLogout(router, firstName, lastName)}
      />
    </Grid>
  );
}

export default Profile;
