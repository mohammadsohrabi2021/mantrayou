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
export const getDataAccountAddressesUserId = async (token,dataUser) => {
  console.log(dataUser?._id)
  const res = await fetch(
    `https://api.mantrayou.com/admin/accounts/addresses/${dataUser?._id}`,
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
export const postAddressesUser = async (token,data,dataUser) => {
  const res = await fetch(`https://api.mantrayou.com/admin/accounts/addresses/add/`, {
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
      additional_notes: data?.additional_notes
    }),
  });
  const resData = await res.json();
  return resData;
};
export const deletedAddressesUser = async (token,id) => {

  const res = await fetch(`https://api.mantrayou.com/client/my_account/addresses/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    
  });
  const resData = await res.json();
  console.log(resData)
  return resData;
};

