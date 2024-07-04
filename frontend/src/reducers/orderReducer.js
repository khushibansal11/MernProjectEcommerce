import { createReducer } from '@reduxjs/toolkit';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

// Initial states
const initialNewOrderState = {};
const initialOrdersState = { orders: [] };
const initialOrderState = {};
const initialOrderDetailsState = { order: {} };

// Reducers
export const newOrderReducer = createReducer(initialNewOrderState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(CREATE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(CREATE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase(CREATE_ORDER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const myOrdersReducer = createReducer(initialOrdersState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(MY_ORDERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(MY_ORDERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(MY_ORDERS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const allOrdersReducer = createReducer(initialOrdersState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(ALL_ORDERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_ORDERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(ALL_ORDERS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const orderReducer = createReducer(initialOrderState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(UPDATE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(UPDATE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    })
    .addCase(DELETE_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    })
    .addCase(UPDATE_ORDER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_ORDER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_ORDER_RESET, (state) => {
      state.isUpdated = false;
    })
    .addCase(DELETE_ORDER_RESET, (state) => {
      state.isDeleted = false;
    });
});

export const orderDetailsReducer = createReducer(initialOrderDetailsState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(ORDER_DETAILS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ORDER_DETAILS_SUCCESS, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    })
    .addCase(ORDER_DETAILS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
