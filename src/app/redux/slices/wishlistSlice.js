import { createSlice } from "@reduxjs/toolkit";


const wishlistslice = createSlice({
    name:"wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        addTowishlist: (state, action) => {
            const item = action.payload;
            if(!state.items.some((existingItem) => existingItem.id === item.id)) {
                state.items.push(item);
            }
        },

        removefromwishlist: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
})

export const {addTowishlist, removefromwishlist} = wishlistslice.actions
export default wishlistslice.reducer