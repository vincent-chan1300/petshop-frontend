import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filterItems",
    initialState: {
        sorting: null,
        priceRange: []
    },
    reducers: {
        putSorting: (state, action) => {
            state.sorting = action.payload.sorting;
        },
        putPriceRange: (state, action) => {
            state.priceRange = action.payload.priceRange;
        },
        
    }
})

export const {putSorting, putPriceRange} = filterSlice.actions;

export const selectItems = (state) => state.filterItems.filterItems;

export default filterSlice.reducer;