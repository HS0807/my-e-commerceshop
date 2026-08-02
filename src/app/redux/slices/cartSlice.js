import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            console.log("Reducer called");
            console.log("Payload:", action.payload);

            state.items.push(action.payload);

            console.log("Updated Cart:", state.items);
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.items = state.items.filter((item) => item.id !== itemId)
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.items.find((i) => i.id === id)
            if (item && quantity >= 1) {
                item.quantity = quantity;
            }
        },
    },
});


export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer;