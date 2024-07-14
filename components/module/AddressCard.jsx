import React from "react";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletedAddressesUser } from "@/pages/api/account/accountApi";
import {
  saveAdressesUserInfoMethod,
  saveOpenDialogCheckMethod,
} from "@/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import DynamicModal from "./DynamicModal";
import { useState } from "react";
import { toast } from "react-toastify";

const AddressCard = ({
  additional_notes,
  address_name,
  address_text,
  city_name,
  postal_code,
  province_name,
  user_id,
  _id,
}) => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.app.userInfo);
  const [openDialogDeleted, setOpenDialogDeleted] = useState(false);
  const [firstName, lastName] = dataUser.full_name.split("-");
  const onDelete = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const resData = await deletedAddressesUser(token, id);
      dispatch(saveAdressesUserInfoMethod(resData?.addresses));
      if (resData?.status) {
        toast.success(
          `${firstName} ${lastName} عزیز آدرس تو با موفقیت از لیست آدرس هات حذف شد`
        );
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };
  const handleOpenDialog = () => {
    setOpenDialogDeleted(!openDialogDeleted);
  };
  return (
    <>
      <Card
        style={{
          maxWidth: 340,
          margin: "20px auto",
          padding: "10px",
          position: "relative",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="right">
                آدرس:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="right">
                <strong>نام:</strong> {address_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="right">
                <strong>آدرس:</strong> {address_text}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="right">
                <strong>شهر:</strong> {city_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="right">
                <strong>کد پستی:</strong> {postal_code}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="right">
                <strong>استان:</strong> {province_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="right" color="textSecondary">
                <strong>توضیحات اضافی:</strong> {additional_notes}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="right" color="textSecondary">
                <strong>کد کاربر:</strong> {user_id}
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ position: "absolute", top: 30, left: 10 }}>
            <IconButton size="small" onClick={() => onEdit(_id)}>
              <EditIcon sx={{ color: "green" }} />
            </IconButton>
            <IconButton size="small" onClick={handleOpenDialog}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
      <DynamicModal
        open={openDialogDeleted}
        onClose={handleOpenDialog}
        title="حذف آدرس از لیست آدرس ها"
        description={`${firstName} ${lastName} عزیز آیا واقعا قصد حذف آدرس خود از لیست آدرس ها رو داری؟ `}
        onConfirm={() => onDelete(_id)}
      />
    </>
  );
};

export default AddressCard;
