export const getAllListsCategories = async (level) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/categories/level/${level}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
    });
    const resData = await res.json();
    return resData;
  
  };