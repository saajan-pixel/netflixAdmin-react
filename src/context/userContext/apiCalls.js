import axios from "axios";
import { api_url } from "../../Url";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
} from "./userAction";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`${api_url}users`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (e) {
    dispatch(getUsersFailure());
  }
};

// update
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await axios.put(`${api_url}users/${id}`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUsersSuccess(user));
  } catch (e) {
    dispatch(updateUsersFailure());
  }
};

// delete
export const deleteUser = async (id, dispatch) => {
  console.log('apiid',id)
  dispatch(deleteUserStart());
  try {
    await axios.delete(`${api_url}users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (e) {
    dispatch(deleteUserFailure());
  }
};
