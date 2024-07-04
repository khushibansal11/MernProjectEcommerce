import { createReducer } from '@reduxjs/toolkit';
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";


// Initial states
const initialProductsState = { products: [] };
const initialNewProductState = { product: {} };
const initialProductState = {};

// Reducers
export const productsReducer = createReducer(initialProductsState, (builder) => {
  builder
  .addCase(CLEAR_ERRORS, (state) => {
    state.error = null;
  })
    .addMatcher(
      (action) => [ALL_PRODUCT_REQUEST, ADMIN_PRODUCT_REQUEST].includes(action.type),
      (state) => {
        state.loading = true;
        state.products = [];
      }
    )
    .addMatcher(
      (action) => [ALL_PRODUCT_SUCCESS, ADMIN_PRODUCT_SUCCESS].includes(action.type),
      (state, action) => {
        state.loading = false;
        if (action.type === ALL_PRODUCT_SUCCESS) {
          state.products = action.payload.products;
          state.productsCount = action.payload.productsCount;
          state.resultPerPage = action.payload.resultPerPage;
          state.filteredProductsCount = action.payload.filteredProductsCount;
        } else {
          state.products = action.payload;
        }
      }
    )
    .addMatcher(
      (action) => [ALL_PRODUCT_FAIL, ADMIN_PRODUCT_FAIL].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
    
});

export const newProductReducer = createReducer(initialNewProductState, (builder) => {
  builder
    .addCase(NEW_PRODUCT_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(NEW_PRODUCT_SUCCESS, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    })
    .addCase(NEW_PRODUCT_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(NEW_PRODUCT_RESET, (state) => {
      state.success = false;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const productReducer = createReducer(initialProductState, (builder) => {
  builder
  .addCase(CLEAR_ERRORS, (state) => {
    state.error = null;
  })
    .addMatcher(
      (action) => [DELETE_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST].includes(action.type),
      (state) => {
        state.loading = true;
      }
    )
    .addMatcher(
      (action) => [DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_SUCCESS].includes(action.type),
      (state, action) => {
        state.loading = false;
        if (action.type === DELETE_PRODUCT_SUCCESS) {
          state.isDeleted = action.payload;
        } else {
          state.isUpdated = action.payload;
        }
      }
    )
    .addMatcher(
      (action) => [DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_FAIL].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
    .addMatcher(
      (action) => [DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET].includes(action.type),
      (state,action) => {
        if (action.type === DELETE_PRODUCT_RESET) {
          state.isDeleted = false;
        } else {
          state.isUpdated = false;
        }
      }
    )
});

const initialDetailsState = { product: {} };
export const productDetailsReducer = createReducer(initialDetailsState, (builder) => {
  builder
    .addCase(PRODUCT_DETAILS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    })
    .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

// Initial states
const initialNewReviewState = {};
const initialProductReviewsState = { reviews: [] };
const initialReviewState = {};

// Reducers
export const newReviewReducer = createReducer(initialNewReviewState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(NEW_REVIEW_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(NEW_REVIEW_SUCCESS, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    })
    .addCase(NEW_REVIEW_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(NEW_REVIEW_RESET, (state) => {
      state.success = false;
    });
});

export const productReviewsReducer = createReducer(initialProductReviewsState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(ALL_REVIEW_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_REVIEW_SUCCESS, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    })
    .addCase(ALL_REVIEW_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export const reviewReducer = createReducer(initialReviewState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(DELETE_REVIEW_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(DELETE_REVIEW_SUCCESS, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    })
    .addCase(DELETE_REVIEW_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_REVIEW_RESET, (state) => {
      state.isDeleted = false;
    });
});
