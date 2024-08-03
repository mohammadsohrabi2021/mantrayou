// utils/inventoryUtils.js

/**
 * بررسی موجودی محصول
 * @param {Object} product - جیسون محصول
 * @param {number} selectedQuantity - تعداد انتخاب شده توسط کاربر
 * @param {Object} selectedVariation - تنوع انتخاب شده توسط کاربر (در صورت وجود)
 * @returns {Object} - نتیجه بررسی و پیام خطا (در صورت وجود)
 */
export const checkProductStock = (product, selectedQuantity, selectedVariation = null) => {
    console.log(product.total_quantity-selectedQuantity ,product.total_quantity)
    if (selectedVariation) {
      const variation = product.variations.find(v => v.color === selectedVariation.color);
      if (variation) {
        if (selectedQuantity > variation.quantity) {
          return {
            success: false,
            message: `تعداد انتخاب شده برای رنگ ${selectedVariation.color} بیشتر از موجودی است.`,
          };
        }
      } else {
        return {
          success: false,
          message: 'تنوع انتخاب شده وجود ندارد.',
        };
      }
    } else {
      if (product.total_quantity-selectedQuantity ==-1) {
        console.log(selectedQuantity , product.total_quantity)
        return {
          success: false,
          message: 'تعداد انتخاب شده بیشتر از موجودی است.',
        };
      }
      else{
        return {
            success: true,
            message: '',
          };
      }
      
    }
  
    return {
      success: true,
      message: '',
    };
  };
  