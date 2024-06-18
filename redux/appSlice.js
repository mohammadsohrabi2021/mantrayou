import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: 0,
  muneListCategories: [],
  activeItem:''

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
    // saveListsInfo: (state, action) => {
    //   state.lists = action.payload;
    // },
    // savedataListInfo: (state, action) => {
    //   state.dataList = action.payload;
    // },
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
  saveActiveItemInfo:saveActiveItemInfoMethod
 
} = appSlice.actions;

export default appSlice.reducer;