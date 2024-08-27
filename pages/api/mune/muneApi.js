export const getAllListsCategories = async (level) => {
    const res = await fetch(`https://api.mantrayou.com/client/categories/level/${level}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
    });
    const resData = await res.json();
    return resData;
  
  };
  // categoryApi.js
const BASE_URL = 'https://api.mantrayou.com/client/categories/childs/';

export const fetchCategory = async (categoryId) => {
  console.log(categoryId)
  try {
    const response = await fetch(`${BASE_URL}${categoryId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
};
export const fetchCategoryInfo = async (categoryId) => {
  try {
    const response = await fetch(`https://api.mantrayou.com/client/categories/${categoryId}/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching category info:', error);
    throw error;
  }
};
