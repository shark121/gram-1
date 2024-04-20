import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartDataState: [],
  total: 0,
};

let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cartDataState = payload;
    },
    deleteItem: (state, { payload }) => {
      const current = state.cartDataState.find(
        (element) => element.id === payload.id
      );

      state.total -= current.qty * current.price;

      state.cartDataState = state.cartDataState.filter(
        (element) => element.id != payload.id
      );
    },
    setTotal: (state, { payload }) => {
      state.total = payload;
    },
    updateTotal: (state, { payload }) => {
      state.total = state.total + payload;
    },

    updateQuantity: (state, { payload }) => {
      let localItem = JSON.parse(sessionStorage.getItem(payload.id));
      console.log("triggered")

      let current = state.cartDataState.find(
        (element) => element.id === payload.id
      );

      if (current.qty == payload.max && payload.step == 1) return;

      if (current.qty == 1 && payload.step == -1) return;

      current.qty += payload.step;

      state.total += payload.price * payload.step;

      localItem.qty = current.qty;

      sessionStorage.setItem(payload.id, JSON.stringify(localItem));
    },

    removeProps:(state)=>{
        for (let item of state.cartDataState) {
            delete item["id"]
            delete item["maximum"]
          }
    }
  },
});

export default cartSlice.reducer;
export const { setCart, deleteItem, setTotal, updateTotal, updateQuantity, removeProps } =
  cartSlice.actions;
