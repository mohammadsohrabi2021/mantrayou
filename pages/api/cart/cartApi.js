export const addProductToCartAPI = async (token, { id, variation, quantity }) => {
  console.log( id, variation, quantity )
  const res = await fetch(`https://api.mantrayou.com/client/cart/add_product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: id,
      count: quantity,
      variation: variation || {},
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to update cart");
  }
  const resData = await res.json();
  return resData;
};

export const removeProductFromCartAPI = async (token, { id, variation, count }) => {
  const res = await fetch(`https://api.mantrayou.com/client/cart/remove_product`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: id,
      count,
      variation: variation || {},
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to remove product from cart");
  }
  const resData = await res.json();
  return resData;
};

export const showCartAPI = async (token) => {
  const res = await fetch(`https://api.mantrayou.com/client/cart/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }
  const resData = await res.json();
  return resData;
};
