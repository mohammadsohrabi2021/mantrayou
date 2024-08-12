export const getDataCheckOutUser = async (token, dataUser) => {
  const res = await fetch(`https://api.mantrayou.com/client/checkout/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  return resData;
};
// فایل: api/addressApi.js

const API_URL = 'https://api.mantrayou.com/client/cart/choose_address';

export const selectUserAddress = async (addressId, token) => {
  console.log(`${API_URL}/${addressId}`)
  const response = await fetch(`${API_URL}/${addressId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to select address');
  }
  return await response.json();
};

// pages/api/checkout/checkoutApi.js
export const getPaymentMethods = async () => {
  try {
    const response = await fetch('https://api.mantrayou.com/client/cart/payment_method');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const selectPaymentMethod = async (token, methodId) => {
  try {
    const response = await fetch(`https://api.mantrayou.com/client/cart/payment/${methodId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error selecting payment method:', error);
    throw error;
  }
};
// api/api.js

export const applyCouponCode = async (token, couponCode) => {
  console.log(token, couponCode)
  const url = `https://api.mantrayou.com/client/cart/add_coupon/${couponCode}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail.fa || 'خطای نامشخصی رخ داده است');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
};
export const updateShippingMethod = async (shippingMethodId,token) => {

  try {
    const response = await fetch(
      `https://api.mantrayou.com/client/cart/shipping_method/${shippingMethodId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}), // در صورت نیاز به ارسال داده اضافی، اینجا آن‌ها را اضافه کنید
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update shipping method");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating shipping method:", error);
    throw error;
  }
};

export const getShippingMethods = async (token, dataUser) => {
  const res = await fetch('https://api.mantrayou.com/client/cart/shipping_method', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  return resData;
};
