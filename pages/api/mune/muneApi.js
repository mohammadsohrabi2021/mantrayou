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