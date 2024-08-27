export const generatePaymentLink = async (token) => {
    try {
      console.log("Token being used:", token); // لاگ توکن
  
      const response = await fetch('https://api.mantrayou.com/client/payment/generate/link', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response from API:", response); // لاگ پاسخ API
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Parsed response data:", data); // لاگ داده‌های پارس شده
  
      return data;
    } catch (error) {
      console.error('Error in generatePaymentLink:', error.message);
      throw error;
    }
  };
  