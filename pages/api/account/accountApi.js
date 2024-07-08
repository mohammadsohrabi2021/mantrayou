export const getDataAccountUser = async (token) => {
    const res = await fetch(`https://api.mantrayou.com/client/my_account/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const resData = await res.json();
    return resData;
  
  };