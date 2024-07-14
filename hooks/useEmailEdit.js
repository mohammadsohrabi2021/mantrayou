import { useState } from 'react';
import Cookies from 'js-cookie';
// import { updateUserEmail } from '@/api/accountApi';
import { toast } from 'react-toastify';
import { updateUserEmail } from '@/pages/api/account/accountApi';

const useEmailEdit = (initialEmail,fetchUserData) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const handleEditEmail = () => {
    setEmail(initialEmail);
    setIsEditingEmail(true);
  };

  const handleEmailChange = async () => {
    const token = Cookies.get("token");
    const resData = await updateUserEmail(token, email );
    if (resData?.status) {
      toast.success(resData?.detail?.fa);
      setIsEditingEmail(false);
      fetchUserData();
    } else {
      toast.error(resData?.detail?.fa);
    }
  };

  return {
    email,
    isEditingEmail,
    setEmail,
    handleEditEmail,
    handleEmailChange
  };
};

export default useEmailEdit;
