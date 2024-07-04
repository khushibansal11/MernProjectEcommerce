import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    })
    .addCase(REMOVE_CART_ITEM, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    })
    .addCase(SAVE_SHIPPING_INFO, (state, action) => {
      state.shippingInfo = action.payload;
    });
});

export default cartReducer;
