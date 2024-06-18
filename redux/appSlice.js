import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: 0,
  muneListCategories: [],

};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveMuneListCategories: (state, action) => {
      state.muneListCategories = action.payload;
    },
    // saveCategoriesInfo: (state, action) => {
    //   state.categories = action.payload;
    // },
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
 
} = appSlice.actions;

export default appSlice.reducer;