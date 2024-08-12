import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  muneListCategories: [],
  activeItem: '',
  userInfo: '',
  openDialog: false,
  addressesUser: [],
  products: [],
  cart: [],
  checkout:[],
  selectedVariation: null,
  selectedQuantity: 1,
  selectedProductId: null,
  stock: {}, // اضافه کردن استیت stock
  isCartDrawerOpen: false,
  isDrawerOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveMuneListCategories: (state, action) => {
      state.muneListCategories = action.payload;
    },
    saveActiveItemInfo: (state, action) => {
      state.activeItem = action.payload;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    saveOpenDialogCheck: (state, action) => {
      state.openDialog = action.payload;
    },
    saveAdressesUserInfo: (state, action) => {
      state.addressesUser = action.payload;
    },
    saveProductsInfo: (state, action) => {
      state.products = action.payload;
    },
    saveCartInfo: (state, action) => {
      state.cart = action.payload;
    },
    saveCheckoutInfo:(state, action) => {
      state.checkout = action.payload;
    },
    addToCart: (state, action) => {
      const { id, variation } = action.payload;
      const existingProduct = state.cart.find(item => item.id === id && JSON.stringify(item.variation) === JSON.stringify(variation));
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      const { id, variation } = action.payload;
      state.cart = state.cart.filter(item => !(item.id === id && JSON.stringify(item.variation) === JSON.stringify(variation)));
    },
    updateCartQuantity: (state, action) => {
      const { id, variation, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id && JSON.stringify(item.variation) === JSON.stringify(variation));
      if (product) {
        product.quantity = quantity;
      }
    },
    updateVariationSelection: (state, action) => {
      state.selectedVariation = action.payload.variation;
    },
    updateQuantitySelection: (state, action) => {
      state.selectedQuantity = action.payload.quantity;
    },
    resetVariationSelection: (state) => {
      state.selectedVariation = null;
      state.selectedQuantity = 1;
    },
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    // اضافه کردن اکشن‌ها و ردیوسرهای مربوط به stock
    setStock: (state, action) => {
      const { productId, stock } = action.payload;
      state.stock[productId] = stock;
    },
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state.stock[productId] !== undefined) {
        state.stock[productId] = Math.max(state.stock[productId] - quantity, 0); // جلوگیری از منفی شدن موجودی
      }
    },
    setCartDrawerOpen: (state, action) => {
      state.isCartDrawerOpen = action.payload;
    },
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  saveMuneListCategories: saveMuneListCategoriesMethod,
  saveActiveItemInfo: saveActiveItemInfoMethod,
  saveUserInfo: saveUserInfoMethod,
  saveOpenDialogCheck: saveOpenDialogCheckMethod,
  saveAdressesUserInfo: saveAdressesUserInfoMethod,
  saveProductsInfo: saveProductsInfoMethod,
  saveCartInfo: saveCartInfoMethod,
  saveCheckoutInfo: saveCheckoutInfoMethod,
  addToCart: addToCartMethod,
  removeFromCart: removeFromCartMethod,
  updateCartQuantity: updateCartQuantityMethod,
  updateVariationSelection: updateVariationSelectionMethod,
  updateQuantitySelection: updateQuantitySelectionMethod,
  resetVariationSelection: resetVariationSelectionMethod,
  setSelectedProductId: setSelectedProductIdMethod,
  setStock, // اکسپورت اکشن‌های مربوط به stock
  updateStock, // اکسپورت اکشن‌های مربوط به stock
  setCartDrawerOpen,
  setDrawerOpen
} = appSlice.actions;

export default appSlice.reducer;
