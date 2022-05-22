export const MovieReducer = (state, action) => {
  switch (action.type) {
    case "MOVIE_START":
      return { movies: [], isFetching: true, error: false };
    case "MOVIE_SUCCESS":
      return { movies: action.payload, isFetching: false, error: false };
    case "MOVIE_FAILURE":
      return { movies: [], isFetching: false, error: true };

    // DELETE CASE
    case "DELETE_START":
      return { ...state, isFetching: true, error: false };
    case "DELETE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_FAILURE":
      return { ...state, isFetching: false, error: true };

    // UPDATE CASE
    case "UPDATE_START":
      return {  ...state, isFetching: true, error: false };
    case "UPDATE_SUCCESS":
      return {  movies: state.movies.map(
        (movie) => movie._id === action.payload._id && action.payload
      ), isFetching: false, error: false };
      case "UPDATE_FAILURE": return {...state,isFetching:false,error:true}

    // CREATING OR POSTING MOVIE
    case "POST_START":
      return { ...state, isFetching: true, error: false };
    case "POST_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "POST_FAILURE":
      return { ...state, isFetching: false, error: true };
      
    default:
      return { ...state };
  }
};
