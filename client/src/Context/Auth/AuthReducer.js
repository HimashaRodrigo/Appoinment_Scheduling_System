/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    SET_LOADING,
    AUTH_ERROR,
    LOGOUT,
  } from "../types";
  
  export default (state, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case REGISTER_FAIL:
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false,
        };
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload,
          google: action.google,
        };
      case SET_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      default:
        return state;
    }
  };
  