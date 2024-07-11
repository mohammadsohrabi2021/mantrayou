export const getAllProducts = async (item_page,page) => {
    const res = await fetch(`https://api.mantrayou.com/client/products/?page=${page}&items_per_page=${item_page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
    });
    const resData = await res.json();
    return resData;
  
  };