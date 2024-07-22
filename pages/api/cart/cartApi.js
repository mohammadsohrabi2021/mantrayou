export const addProductToCartAPI = async (token, { id, variation, quantity }) => {
    console.log({ id, variation, quantity })
    const res = await fetch(`https://api.mantrayou.com/client/cart/add_product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: id,
        count: quantity,
        variation: variation || {}
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update cart");
    }
    const resData = await res.json();
    return resData;
  };
  