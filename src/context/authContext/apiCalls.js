import { loginFailure, loginStart, loginSuccess, logout } from "./authAction";
import axios from "axios";
import { api_url } from "../../Url";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${api_url}auth/login`, user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  
  } catch (e) {
    dispatch(loginFailure());
  }
};

export const logouts = (dispatch) => {
  console.log("logout");
  dispatch(logout());
};
