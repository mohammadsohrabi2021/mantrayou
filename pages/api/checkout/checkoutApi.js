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

