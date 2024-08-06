import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextareaAutosize,
  DialogContent,
  DialogActions,
  Grid,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  editAddressUser,
  fetchCities,
  fetchProvinces,
  postAddressesUser,
} from "@/pages/api/account/accountApi"; // اطمینان حاصل کنید که این مسیر درست است
import { dataInput } from "@/Data/DataInputProfile";
import { useSelector } from "react-redux";

function EditAddressModalCheckOut({
  open,
  onClose,
  address,
  refreshAddresses,
  isNewAddress,
}) {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      province_name: "",
      city_name: "",
      address_text: "",
      additional_notes: "",
    },
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResulte, setLoadingResulte] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProvincesData = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
        if (!isNewAddress && address) {
          setSelectedProvince(address.province_name);
          reset(address); // بازنشانی فرم با داده‌های جدید آدرس
          const provinceId = provincesData.find(
            (province) => province.name === address.province_name
          )?.id;
          const citiesData = await fetchCities(provinceId);
          setCities(citiesData);
          setSelectedCity(address.city_name);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvincesData();
  }, [open, address, isNewAddress, reset]);

  useEffect(() => {
    if (!selectedProvince) return;
    const fetchCitiesData = async () => {
      try {
        const provinceId = provinces.find(
          (province) => province.name === selectedProvince
        )?.id;
        const citiesData = await fetchCities(provinceId);
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCitiesData();
  }, [selectedProvince, provinces]);

  const handleProvinceChange = (event) => {
    const newProvince = event.target.value;
    setSelectedProvince(newProvince);
    reset({ ...getValues(), province_name: newProvince, city_name: "" });
  };

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    reset({ ...getValues(), city_name: newCity });
  };
  const dataUser = useSelector((state) => state.app.userInfo);
  const onSubmit = async (data) => {
    setLoadingResulte(true); // تنظیم وضعیت لودینگ به true قبل از ارسال درخواست
    try {
      const token = Cookies.get('token');
     const responce=  address?._id ===undefined ? await postAddressesUser(token,data, dataUser): await editAddressUser(token, address._id, data);
     console.log(responce);
     if (responce?.status) {
        toast.success(address?._id ===undefined  ? 'آدرس با موفقیت افزوده شد' : 'آدرس با موفقیت ویرایش شد');
        refreshAddresses();
        onClose();
     }
    
    } catch (error) {
      toast.error('خطا در ویرایش آدرس');
      console.error('Error editing address:', error);
    } finally {
      setLoadingResulte(false); // تنظیم وضعیت لودینگ به false پس از اتمام درخواست
    }
  };
  const handleClose = () => {
    reset({
      province_name: "",
      city_name: "",
      address_text: "",
      additional_notes: "",
    });
    onClose();
  };
console.log(address?._id)
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{fontFamily:'iran-sans'}}>{address?._id ===undefined ? "ایجاد آدرس جدید" : "ویرایش آدرس"}</DialogTitle>
      <DialogContent>
        {loading ? (
         <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
         <Typography fontFamily={'iran-sans'}>در حال پرداز لطفا شکیبا باشید ....</Typography>
          <CircularProgress />
      </Grid>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="province-label">نام استان</InputLabel>
              <Controller
                name="province_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="province-label"
                    label="نام استان"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province.id} value={province.name}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={!selectedProvince}>
              <InputLabel id="city-label">نام شهر</InputLabel>
              <Controller
                name="city_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="city-label"
                    label="نام شهر"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
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
            <Grid display={"flex"} gap={2}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2, fontFamily: "iran-sans", backgroundColor: "#000" }}
                disabled={loadingResulte} // غیرفعال کردن دکمه در حالت لودینگ
              >
                {loadingResulte ? (
                  <CircularProgress size={24} />
                ) : address?._id ===undefined  ? (
                  "افزودن آدرس جدید"
                ) : (
                  "ویرایش آدرس"
                )}
              </Button>
              <Button
                onClick={handleClose}
                fullWidth
                sx={{ mt: 2, fontFamily: "iran-sans" }}
                variant="contained"
                color="error"
              >
                لغو
              </Button>
            </Grid>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressModalCheckOut;
