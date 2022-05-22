import axios from "axios";
import { api_url } from "../../Url";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./listAction";

export const getAllLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(`${api_url}lists`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log("apicall", res.data);
    dispatch(getListsSuccess(res.data));
  } catch (e) {
    dispatch(getListsFailure());
  }
};

// delete list
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(`${api_url}lists/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(deleteListSuccess(id));
  } catch (e) {
    dispatch(deleteListFailure());
  }
};

// update list
export const updateList = async (id, list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res=await axios.put(`${api_url}lists/${id}`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(updateListSuccess(res.data));
  } catch (e) {
    dispatch(updateListFailure());
  }
};
// create list
export const addList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(`${api_url}lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });

    dispatch(createListSuccess(res.data));
  } catch (e) {
    dispatch(createListFailure());
  }
};
