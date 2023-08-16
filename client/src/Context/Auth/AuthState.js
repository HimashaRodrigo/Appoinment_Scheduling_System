import AuthContext from "./AuthContext";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";
import AuthReducer from "./AuthReducer";
import { useReducer } from "react";
import axios from "axios";
const AuthState = (props) => {
  const initial = {
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initial);
  //user logout
  const logout = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("api/v1/auth/logout");
      console.log(res);
      dispatch({ type: LOGOUT });
      console.log({ logout: res });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGOUT });
    }
  };

  const loadUser = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get("api/v1/auth/current-user");
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: AUTH_ERROR });
    }
  };

  const logingUser = async (formData) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.post("api/v1/auth/login", formData);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });
    loadUser();
  };
  const RegisterUser = async (formData) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.post("api/v1/job-seeker", formData);
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
  console.log(state.user);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        logingUser,
        logout,
        loadUser,
        RegisterUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
