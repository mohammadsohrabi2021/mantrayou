import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  muneListCategories: [],
  activeItem: '',
  userInfo: '',
  openDialog: false,
  addressesUser: [],
  products: [],
  cart: []
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
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    updateCartQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    }
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
  addToCart: addToCartMethod,
  removeFromCart: removeFromCartMethod,
  updateCartQuantity: updateCartQuantityMethod
} = appSlice.actions;

export default appSlice.reducer;
