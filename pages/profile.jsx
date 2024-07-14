import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  getDataAccountAddressesUserId,
  getDataAccountUser,
} from "./api/account/accountApi";
import {
  saveAdressesUserInfoMethod,
  saveOpenDialogCheckMethod,
  saveUserInfoMethod,
} from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import DynamicModal from "@/components/module/DynamicModal";
import { useRouter } from "next/router";
import { handleLogout } from "@/utils/handleLogout";
import TemplateDesktopProfile from "@/components/template/TemplateDesktopProfile";
import TemplateMobileProfile from "@/components/template/TemplateMobileProfile";

function Profile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const openDialog = useSelector((state) => state.app.openDialog);
  const router = useRouter();
  const handleOpenDialog = () => {
    dispatch(saveOpenDialogCheckMethod(!openDialog));
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
  }, [saveAdressesUserInfoMethod, saveUserInfoMethod]);

  const dataUser = useSelector((state) => state.app.userInfo);

  if (loading) {
    return <Grid display={'flex'}gap={1} height={'50vh'} justifyContent={'center'} alignItems={'center'}>
     <Typography fontFamily={'iran-sans'}>درحال دریافت اطلاعات  لطفا صبور باشید...</Typography>
      <CircularProgress />
    </Grid>;
  }
  const [firstName, lastName] = dataUser.full_name.split("-");

  return (
    <Grid container>
      <Grid item xs={12}>
        {isMobile ? (
          <TemplateMobileProfile
            handleOpenDialog={handleOpenDialog}
            fetchUserAddressesData={fetchUserAddressesData}
            fetchUserData={fetchUserData}
          />
        ) : (
          <Grid width={"100%"}>
            <TemplateDesktopProfile fetchUserAddressesData={fetchUserAddressesData} handleOpenDialog={handleOpenDialog}  fetchUserData={fetchUserData}/>
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
