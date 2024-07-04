import { createReducer } from '@reduxjs/toolkit';
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

const initialUserState = { user: {} };

export const userReducer = createReducer(initialUserState, (builder) => {
  builder
  
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(LOGOUT_SUCCESS, (state) => {
      state.loading = false;
      state.user=null;
      state.isAuthenticated=false;
    })
    .addCase(LOGOUT_FAIL, (state,action) => {
      state.loading = false;
      state.error=action.payload;
    })
    .addCase(LOAD_USER_FAIL,(state,action) => {
      state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // state.error = action.payload;
    })
    .addMatcher(
      action => [LOGIN_REQUEST, REGISTER_USER_REQUEST,LOAD_USER_REQUEST].includes(action.type),
      state => {
        state.loading = true;
        state.isAuthenticated = false;
      }
    )
    .addMatcher(
      action => [LOGIN_SUCCESS, REGISTER_USER_SUCCESS,LOAD_USER_SUCCESS].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      }
    )
    .addMatcher(
      action => [LOGIN_FAIL, REGISTER_USER_FAIL].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      }
    );
});

const initialProfileUserState = {};

export const profileReducer = createReducer(initialProfileUserState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(DELETE_USER_SUCCESS, (state,action) => {
      state.loading= false;
      state.isDeleted= action.payload.success;
      state.message= action.payload.message;
    })
    .addCase(DELETE_USER_RESET, (state,action) => {
      state.isDeleted= false;
    })
    .addMatcher(
      (action) => [UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST,UPDATE_USER_REQUEST,DELETE_USER_REQUEST].includes(action.type),
      (state) => {
        state.loading = true;
      }
    )
    .addMatcher(
      (action) => [UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_SUCCESS,UPDATE_USER_SUCCESS].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      }
    )
    .addMatcher(
      (action) => [UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL,UPDATE_USER_FAIL,DELETE_USER_FAIL].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
    .addMatcher(
      (action) => [UPDATE_PROFILE_RESET, UPDATE_PASSWORD_RESET,UPDATE_USER_RESET].includes(action.type),
      (state) => {
        state.isUpdated = false;
      }
    );
});

const initialForgotPasswordUserState = {};

export const forgotPasswordReducer = createReducer(initialForgotPasswordUserState, (builder) => {
  builder
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    })
    .addCase(RESET_PASSWORD_SUCCESS, (state,action) => {
      state.loding = false;
      state.success = action.payload;
    })
    .addMatcher(
      (action) => [FORGOT_PASSWORD_REQUEST,RESET_PASSWORD_REQUEST].includes(action.type),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    )
    .addMatcher(
      (action) => [FORGOT_PASSWORD_SUCCESS].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.message = action.payload;
      }
    )
    .addMatcher(
      (action) => [FORGOT_PASSWORD_FAIL,RESET_PASSWORD_FAIL].includes(action.type),
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
});

const initialAllUsersState = { users: [] };
const initialUserDetailsState = { user: {} };

export const allUsersReducer = createReducer(initialAllUsersState, (builder) => {
  builder
    .addCase(ALL_USERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(ALL_USERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(ALL_USERS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});

export const userDetailsReducer = createReducer(initialUserDetailsState, (builder) => {
  builder
    .addCase(USER_DETAILS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(USER_DETAILS_SUCCESS, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(USER_DETAILS_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});