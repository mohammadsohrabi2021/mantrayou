export const getAllProducts = async (items_per_page, page, filter_by = null, category_id = null) => {
  console.log(items_per_page, page, filter_by , category_id )
  let url = `https://api.mantrayou.com/client/products/?page=${page}&items_per_page=${items_per_page}`;

  if (filter_by) {
    url += `&filter_by=${filter_by}`;
  }

  if (category_id) {
    url += `&category_id=${category_id}`;
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


export const getTotalProducts = async (categoryId) => {
  // Base URL without category_id
  let url = `https://api.mantrayou.com/client/products/total_count`;

  // Add category_id to the URL if it exists
  if (categoryId) {
    url += `?category_id=${categoryId}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
