import axios from "axios";
import { api_url } from "../../Url";
import {
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMovieFailure,
  getMovieStart,
  getMovieSuccess,
  postMovieFailure,
  postMovieStart,
  postMovieSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} from "./movieAction";

// get all movies
export const getMovies = async (dispatch) => {
  dispatch(getMovieStart());
  try {
    const res = await axios.get(`${api_url}movies`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log("movies", res.data);
    dispatch(getMovieSuccess(res.data));
  } catch (e) {
    dispatch(getMovieFailure);
  }
};

// delete movie
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete(`${api_url}movies/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (e) {
    dispatch(deleteMovieFailure());
  }
};

// creating or posting movie
export const addMovie = async (movie, dispatch) => {
  dispatch(postMovieStart());
  try {
    const res = await axios.post(`${api_url}movies`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(postMovieSuccess(res.data));
  } catch (e) {
    dispatch(postMovieFailure);
  }
};

export const updateMovie = async (id, movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`${api_url}movies/${id}`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
  console.log("updated",res.data)
    dispatch(updateMovieSuccess(movie))
  } catch (e) {
    dispatch(updateMovieFailure());
  }
};
