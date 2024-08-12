// lib/api.js
export const getProduct = async (id) => {

    const res = await fetch(`https://api.mantrayou.com/client/products/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };
  export const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`https://api.mantrayou.com/client/products/ratings/${productId}?page=1&items_per_page=5`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };
  
  export const submitReview = async (token, productId, review) => {

    try {
      const response = await fetch(`https://api.mantrayou.com/client/ratings/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };
  
  export const editReview = async (token, productId,reviewId, review) => {
    console.log(token, productId,reviewId, review)
    try {
      const response = await fetch(`https://api.mantrayou.com/client/ratings/${productId}?rating_id=${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error editing review:", error);
      throw error;
    }
  };
  
  export const deleteReview = async (token, reviewId,productId) => {
    try {
      const response = await fetch(`https://api.mantrayou.com/client/ratings/${productId}?rating_id=${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  };
  export const fetchRecommendedProducts = async (productId) => {
    try {
      const response = await fetch(`https://api.mantrayou.com/client/products/similar?result_count=4`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // تنظیم Content-Type
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ "product_ids": [productId] })  
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recommended products:", error);
      return [];
    }
  };
  