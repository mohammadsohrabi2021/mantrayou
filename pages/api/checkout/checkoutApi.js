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
