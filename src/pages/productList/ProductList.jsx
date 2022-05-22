import "./productList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/movieApi";

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      const getMoviess = async () => {
        getMovies(dispatch);
      };
      getMoviess();
    }
    return () => {
      unmounted = true;
    };
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };
  console.log(",,,,", movies);


  return (
    <div className="productList">
      <div className="productTitleContainer">
        <Link to="/newproduct">
          <button className="productAddButton">Add Movie</button>
        </Link>
      </div>
  

      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Movie</th>
            <th scope="col">Genre</th>
            <th scope="col">Year</th>
            <th scope="col">Series</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <th scope="row">{movie._id}</th>
              <td>
    
                <div className="productListItem">
                  <img className="productListImg" src={movie.img} alt="" />
                  {movie.title}
                </div>
              </td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td>{movie.isSeries ? "Yes" : "No"}</td>
              <td>
              <Link to={{ pathname: "/movie/" + movie._id }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(movie._id)}
            />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
