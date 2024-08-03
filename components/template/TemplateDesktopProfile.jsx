import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  Divider,
  Paper,
  TextField,
  TextareaAutosize,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { dataInput, dataMuneItem } from "@/Data/DataInputProfile";
import { saveAdressesUserInfoMethod } from "@/redux/appSlice";
import { getDataAccountAddressesUserId, postAddressesUser, fetchProvinces, fetchCities, editAddressUser } from "@/pages/api/account/accountApi";
import Cookies from "js-cookie";
import AddressCard from "../module/AddressCard";
import { toast } from "react-toastify";
import useEmailEdit from "@/hooks/useEmailEdit";
import useProfileEdit from "@/hooks/useProfileEdit";
import useBirthdayInfo from "@/hooks/useGregorianToJalali";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

function TemplateDesktopProfile({ handleOpenDialog, fetchUserAddressesData, fetchUserData }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dataUser = useSelector((state) => state.app.userInfo);
  const {
    email,
    isEditingEmail,
    setEmail,
    handleEditEmail,
    handleEmailChange
  } = useEmailEdit(dataUser.email, fetchUserData);
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState("accountOverview");
  const userAdresses = useSelector((state) => state.app.addressesUser);
  const [firstName, lastName] = dataUser.full_name.split("-");
  const [isEditingAddress, setIsEditingAddress] = useState(false); // اضافه کردن state برای ویرایش آدرس
  const [loading, setLoading] = useState(false); // اضافه کردن state برای حالت لودینگ

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchProvincesData = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvincesData();
  }, []);

  useEffect(() => {
    const fetchCitiesData = async () => {
      if (!selectedProvince) return;
      try {
        const citiesData = await fetchCities(provinces.find(province => province.name === selectedProvince).id);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCitiesData();
  }, [selectedProvince, provinces]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCity('');
    setValue("province_name", event.target.value); // تنظیم مقدار استان در react-hook-form
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setValue("city_name", event.target.value); // تنظیم مقدار شهر در react-hook-form
  };

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    setLoading(true); // فعال کردن حالت لودینگ
    try {
      let resData;
      if (data._id) {
        // ویرایش آدرس موجود
        resData = await editAddressUser(token, data._id, data);
        if (resData?.status) {
          toast.success(
            `${firstName} ${lastName} عزیز آدرس تو با موفقیت ویرایش شد`
          );
        }
      } else {
        // ایجاد آدرس جدید
        resData = await postAddressesUser(token, data, dataUser);
        if (resData?.status) {
          toast.success(
            `${firstName} ${lastName} عزیز آدرس تو با موفقیت به لیست آدرس هات اضافه شد`
          );
        }
      }
      fetchUserAddressesData();
      reset({});
      setSelectedProvince('');
      setSelectedCity('');
      setIsEditingAddress(false); // تنظیم حالت ویرایش به false
    } catch (error) {
      toast.error("خطا در ویرایش آدرس");
      console.error("Error editing address:", error);
    } finally {
      setLoading(false); // غیرفعال کردن حالت لودینگ
    }
  };

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
  const { jalaliDateStr, daysUntilBirthday } = useBirthdayInfo(birthday);

  const onEdit = (address) => {
    setValue('address_name', address.address_name);
    setValue('address_text', address.address_text);
    setValue('city_name', address.city_name);
    setValue('postal_code', address.postal_code);
    setValue('province_name', address.province_name);
    setValue('additional_notes', address.additional_notes);
    setValue('user_id', address.user_id);
    setValue('_id', address._id);
    setSelectedProvince(address.province_name);
    setSelectedCity(address.city_name);
    setIsEditingAddress(true); // تنظیم حالت ویرایش به true
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "accountOverview":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={"iran-sans"} color={"gray"} fontWeight="bold">
              اطلاعات حساب من
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Typography fontFamily={"iran-sans"} lineHeight={3} color="textSecondary">
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
                  <Typography fontFamily={"iran-sans"} color={"blue"}>{firstName}</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography fontFamily={"iran-sans"} lineHeight={3} color="textSecondary">
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
                  <Typography fontFamily={"iran-sans"} color={"blue"}>{lastName}</Typography>
                )}
              </Box>
            </Box>
            <Box mt={2}>
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
              <Typography fontFamily={"iran-sans"} lineHeight={3} color="textSecondary">
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
                    <Button onClick={handleEmailChange}>ذخیره</Button>
                  </>
                ) : (
                  <>
                    <Typography fontFamily={"iran-sans"} color={"blue"}>
                      {dataUser.email}
                    </Typography>
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
            <Button variant="outlined" sx={{ marginTop: 4 }}>
              بازنشانی رمز عبور
            </Button>
          </Box>
        );
      case "myAddresses":
        return (
          <Box display={"flex"} justifyContent={"space-between"} sx={{ padding: 2 }}>
            <Box width={"50%"}>
              <Typography fontFamily={"iran-sans"} fontWeight="bold">
                {isEditingAddress ? "ویرایش آدرس" : "آدرس جدید"}
              </Typography>
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
                        helperText={errors[item.name] ? errors[item.name].message : ""}
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
                  disabled={loading} // غیرفعال کردن دکمه در حالت لودینگ
                >
                  {loading ? <CircularProgress size={24} /> : isEditingAddress ? "ویرایش آدرس" : "ذخیره آدرس"}
                </Button>
              </form>
            </Box>
            <Box width={"50%"}>
              <Typography pr={2} fontFamily={"iran-sans"} textAlign={"right"}>
                آدرس های من
              </Typography>
              <Box width={"100%"} sx={{ maxHeight: 500, overflowY: 'auto' }}>
                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>
                  {userAdresses?.length > 0 ? (
                    <>
                      {userAdresses.map((item) => (
                        <AddressCard key={item?._id} {...item} onEdit={onEdit}/>
                      ))}
                    </>
                  ) : (
                    <Typography mt={10} fontFamily={"iran-sans"} color={"red"}>
                      بدون ادرس
                    </Typography>
                  )}
                </Grid>
              </Box>
            </Box>
          </Box>
        );
      case "orders":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={"iran-sans"} color={"gray"} pb={3} fontWeight="bold">
              سفارشات من
            </Typography>
            <Typography textAlign={"center"} fontFamily={"iran-sans"} color="red">
              بدون سفارش
            </Typography>
          </Box>
        );
      case "mantraClub":
        return (
          <Box sx={{ padding: 2 }}>
            <Typography fontFamily={"iran-sans"} pb={3} color={"gray"} fontWeight="bold">
              کلوب مانترا
            </Typography>
            <Typography fontFamily={"iran-sans"} textAlign={"center"} color="red">
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
            <Typography fontFamily={"iran-sans"} fontWeight="bold" textAlign={"center"} color={"green"}>
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
                <Typography variant="body1" fontFamily={"iran-sans"} fontSize={"14px"} color={selectedSection === item.value && "gray"}>
                  {" "}
                  {item.title}{" "}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button sx={{ color: "red" }} onClick={handleOpenDialog}>
              <LogoutIcon sx={{ marginLeft: 1 }} />
              <Typography fontFamily={"iran-sans"}>خروج</Typography>
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

export default TemplateDesktopProfile;
