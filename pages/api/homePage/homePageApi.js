export const getAllProducts = async (items_per_page, page, filter_by = null) => {

  let url = `https://api.mantrayou.com/client/products/?page=${page}&items_per_page=${items_per_page}`;
  if (filter_by) {
    url += `&filter_by=${filter_by}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  return resData;
};

export const getTotalProducts = async () => {
  const res = await fetch(`https://api.mantrayou.com/client/products/total_count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};