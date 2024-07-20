import { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { updateUserProfile } from '@/pages/api/account/accountApi';

const useProfileEdit = (initialData, fetchUserData) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [birthday, setBirthday] = useState(initialData.birthday);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleProfileChange = async () => {
    const token = Cookies.get("token");
    const full_name = `${firstName}-${lastName}`;
    const resData = await updateUserProfile(token,  full_name, birthday );
    if (resData?.status) {
      toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
      setIsEditing(false);
      fetchUserData();  // فراخوانی تابع fetchUserData بعد از موفقیت آمیز بودن عملیات
    } else {
      toast.error("خطا در به‌روزرسانی اطلاعات");
    }
  };

  return {
    firstName,
    lastName,
    birthday,
    isEditing,
    setFirstName,
    setLastName,
    setBirthday,
    handleEditProfile,
    handleProfileChange
  };
};

export default useProfileEdit;
