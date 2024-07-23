// utils/cartUtils.js
import {
  addProductToCartAPI,
  removeProductFromCartAPI,
  showCartAPI,
} from "../pages/api/cart/cartApi";
import {
  addToCartMethod,
  updateCartQuantityMethod,
  removeFromCartMethod,
  setCartItems,
} from "@/redux/appSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const handleAddToCart = async (dispatch, product, variation = {}) => {
  const token = Cookies.get("token");
  const productToAdd = {
    id: product?.id || product?._id,
    name: product?.name,
    price: product?.price,
    price_wd: product?.price_wd,
    variation: variation,
    main_image: product?.main_image,
    quantity: product?.quantity || 1,
  };
console.log(product)
  try {
    const response = await addProductToCartAPI(token, {
      id: product.id || product._id,
      variation: productToAdd.variation,
      quantity: productToAdd.quantity,
    });
    console.log(response);
    if (response?.status) {
      dispatch(addToCartMethod(productToAdd));
      toast.success(response?.detail?.fa);
    }
  } catch (error) {
    console.error("Failed to add product to cart:", error.detail);
    toast.error("خطا در افزودن محصول به سبد خرید");
  }
};

export const handleUpdateQuantity = async (dispatch, product, newQuantity) => {
  const token = Cookies.get("token");
  const currentQuantity = product.quantity;
  const payload = {
    id: product.id || product._id,
    variation: product.variation || {},
  };

  if (newQuantity === 0) {
    await handleRemoveItem(dispatch, product, currentQuantity);
  } else if (newQuantity > currentQuantity) {
    try {
      const response = await addProductToCartAPI(token, {
        id: payload.id,
        variation: payload.variation,
        quantity: newQuantity - currentQuantity, // Add the difference
      });
      console.log(response);
      if (response?.status) {
        dispatch(updateCartQuantityMethod({ ...payload, quantity: newQuantity }));
        toast.success("سبد خرید شما با موفقیت بروزرسانی شد");
      }
    } catch (error) {
      console.error("Failed to update product quantity:", error);
      toast.error("خطا در به‌روزرسانی تعداد محصول");
    }
  } else if (newQuantity < currentQuantity) {
    try {
      const response = await removeProductFromCartAPI(token, {
        id: payload.id,
        variation: payload.variation,
        count: currentQuantity - newQuantity, // Remove the difference
      });
      console.log(response);
      if (response?.status) {
        dispatch(updateCartQuantityMethod({ ...payload, quantity: newQuantity }));
        toast.success("سبد خرید شما با موفقیت بروزرسانی شد");
      }
    } catch (error) {
      console.error("Failed to update product quantity:", error);
      toast.error("خطا در به‌روزرسانی تعداد محصول");
    }
  }
};


export const handleRemoveItem = async (dispatch, product, count) => {
  const token = Cookies.get("token");
  console.log(product, count)
  const payload = {
    id: product.id || product._id,
    variation: product.variation || {},
    count,
  };

  dispatch(removeFromCartMethod(payload));
  try {
    await removeProductFromCartAPI(token, payload);
    toast.success("محصول از سبد خرید حذف شد");
  } catch (error) {
    console.error("Failed to remove product from cart:", error);
    toast.error("خطا در حذف محصول از سبد خرید");
  }
};

export const syncCartWithServer = async (dispatch) => {
  const token = Cookies.get("token");
  try {
    const cartData = await showCartAPI(token);
    const items = cartData.items.map((item) => ({
      id: item.product_id,
      variation: item.variation,
      quantity: item.quantity,
      main_image: item.main_image,
      name: item.name,
      price: item.price,
      price_wd: item.price_wd,
    }));
    dispatch(setCartItems(items));
  } catch (error) {
    console.error("Failed to sync cart with server:", error);
    toast.error("خطا در همگام‌سازی سبد خرید با سرور");
  }
};
