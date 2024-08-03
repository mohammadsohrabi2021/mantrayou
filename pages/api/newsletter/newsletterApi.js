export const registerNewsletter = async (data) => {
    try {
      const response = await fetch('https://api.mantrayou.com/client/newsletter/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  