export const getDataAccountUser = async (token) => {
  const res = await fetch(
    `https://api.mantrayou.com/client/my_account/overview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const resData = await res.json();

  return resData;
};
export const getDataAccountAddressesUserId = async (token, dataUser) => {

  const res = await fetch(
    `https://api.mantrayou.com/client/my_account/addresses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const resData = await res.json();
  return resData;
};
export const postAddressesUser = async (token, data, dataUser) => {
  const res = await fetch(
    `https://api.mantrayou.com/client/my_account/addresses/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: dataUser?._id,
        address_text: data?.address_text,
        province_name: data?.province_name,
        city_name: data?.city_name,
        postal_code: data?.postal_code,
        address_name: data?.address_name,
        additional_notes: data?.additional_notes,
      }),
    }
  );
  const resData = await res.json();
  return resData;
};
export const deletedAddressesUser = async (token, id) => {
  const res = await fetch(
    `https://api.mantrayou.com/client/my_account/addresses/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const resData = await res.json();

  return resData;
};
export const updateUserEmail = async (token, newEmail) => {
  const res = await fetch(`https://api.mantrayou.com/client/my_account/email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      new_email: newEmail,
    }),
  });
  const resData = await res.json();
  return resData;
};
export const updateUserProfile = async (token, full_name, birthday) => {
  try {
    // بررسی اینکه آیا birthday یک شیء Date است
    const birthdayStr = birthday instanceof Date ? birthday.toISOString().split("T")[0] : birthday.split("T")[0];


    const res = await fetch(
      `https://api.mantrayou.com/client/my_account/basic_info`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name,
          birthday: birthdayStr, // استفاده از تاریخ تبدیل شده به فرمت مورد نظر
        }),
      }
    );

    // بررسی وضعیت پاسخ
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error("An error occurred:", error);
    // بازگرداندن خطا برای مدیریت در سطح بالاتر
    throw error;
  }
};
// api/generalApi.js
export const fetchProvinces = async () => {
  try {
    const response = await fetch('https://api.mantrayou.com/client/general/provinces');
    if (!response.ok) throw new Error('Failed to fetch provinces');
    return await response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const fetchCities = async (provinceId) => {
  try {
    const response = await fetch(`https://api.mantrayou.com/client/general/${provinceId}/cities`);
    if (!response.ok) throw new Error('Failed to fetch cities');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

const BASE_URL = "https://api.mantrayou.com";

export const editAddressUser = async (token, addressId, addressData) => {
  try {
    const response = await fetch(`${BASE_URL}/client/my_account/addresses/${addressId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      throw new Error("Error editing address");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error editing address");
  }
};


