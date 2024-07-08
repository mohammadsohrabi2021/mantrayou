import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: 0,
  muneListCategories: [],
  activeItem:'',
  userInfo:'',
  openDialog:false

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
    // loadCategoriesInfo: (state, action) => {
    //   state.loadCategory = action.payload;
    // },
    // checkedInfo: (state, action) => {
    //   state.checked = action.payload;
    // },
    // unitInfo: (state, action) => {
    //   state.unitInfo = action.payload;
    // },
    // productInfo: (state, action) => {
    //   state.products = action.payload;
    // },

  },
});

// Action creators are generated for each case reducer function
export const {
  saveMuneListCategories: saveMuneListCategoriesMethod,
  saveActiveItemInfo:saveActiveItemInfoMethod,
  saveUserInfo:saveUserInfoMethod,
  saveOpenDialogCheck:saveOpenDialogCheckMethod
 
} = appSlice.actions;

export default appSlice.reducer;