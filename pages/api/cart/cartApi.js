export const addProductToCartAPI = async (token, { id, variation, quantity }) => {
  // Check if variation is an empty object
  const isVariationEmpty = !variation || Object.keys(variation).length === 0;

  // If variation is empty, set quantity to 1
  const finalQuantity = isVariationEmpty ? 1 : quantity;

  console.log(isVariationEmpty);

  const res = await fetch(`https://api.mantrayou.com/client/cart/add_product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: id,
      count: finalQuantity,
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
export const autoCompleteSearchAPI = async (term) => {
  const response = await fetch(`https://api.mantrayou.com/client/products/search/auto_complete/?term=${term}`);

  if (!response.ok) {
    throw new Error('Failed to fetch autocomplete results');
  }

  const resData = await response.json();
  return resData;
};
export const getFreeShippingThreshold = async () => {
  try {
    const response = await fetch('https://api.mantrayou.com/client/general/free_shipping_threshold');
    const data = await response.json();
    return data.free_shipping_threshold.value;
  } catch (error) {
    console.error('Failed to fetch free shipping threshold:', error);
    return null;
  }
};