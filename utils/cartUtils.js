// utils/cartUtils.js
import { addProductToCartAPI } from "@/pages/api/cart/cartApi";
import { addToCartMethod, updateCartQuantityMethod, removeFromCartMethod } from "@/redux/appSlice";
import { toast } from "react-toastify";

export const handleAddToCart = async (dispatch, token, product, variation = {}) => {
  const productToAdd = {
    id: product.id,
    name: product.name,
    price: product.price,
    price_wd: product.price_wd,
    variation: variation,
    main_image: product.main_image,
    quantity: product.quantity || 1,
  };

  dispatch(addToCartMethod(productToAdd));
  toast.success("محصول شما با موفقیت به سبد خرید اضافه شد");

  try {
    await addProductToCartAPI(token, { id: product.id, variation: productToAdd.variation, quantity: productToAdd.quantity });
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    toast.error("خطا در افزودن محصول به سبد خرید");
  }
};

export const handleUpdateQuantity = async (dispatch, token, product, newQuantity) => {
  const payload = {
    id: product.id,
    variation: product.variation || {}
  };

  if (newQuantity === 0) {
    dispatch(removeFromCartMethod(payload));
    toast.success("محصول از سبد خرید حذف شد");
  } else {
    dispatch(updateCartQuantityMethod({ ...payload, quantity: newQuantity }));
    toast.success("تعداد محصول به‌روزرسانی شد");
  }

  try {
    await addProductToCartAPI(token, { id: payload.id, variation: payload.variation, quantity: newQuantity });
  } catch (error) {
    console.error("Failed to update product quantity:", error);
    toast.error("خطا در به‌روزرسانی تعداد محصول");
  }
};
