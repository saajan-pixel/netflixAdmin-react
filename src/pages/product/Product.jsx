import { Link, useParams, useHistory } from "react-router-dom";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../Url";
import { updateMovie } from "../../context/movieContext/movieApi";
import { MovieContext } from "../../context/movieContext/movieContext";

export default function Product() {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState({});
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const { dispatch } = useContext(MovieContext);
  const [progress, setProgress] = useState(0);
  const history=useHistory()

  useEffect(() => {
    let unmounted = false;
    const getMovieById = async () => {
      try {
        const res = await axios.get(`${api_url}movies/find/${movieId}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (!unmounted) {
          setMovie(res.data);
        }
      } catch (e) {
        console.log(e);
      }

      return () => {
        unmounted = true;
      };
    };

    getMovieById();
  }, [movieId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };
  // all files is taken and upload to firebase
  const upload = (items) => {
    items.forEach((item) => {
      console.log("item", item);
      const fileName = new Date().getTime() + item.label + item.file?.name;
      const storageRef = ref(storage, `/items/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, item.file);
      // const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
          setProgress(Math.ceil(progress));
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setData((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            // setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUpload(true);
    upload([
      { file: img, label: "img" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(movieId, data, dispatch);
    history.push('/movies')
  };

  console.log(
    'update movie',data
  )
  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="div">
        <h1 className="productTitle">Movie</h1>
       
       <button className="productAddButton" onClick={()=> history.goBack()}>Cancel</button>
        </div>
     
      
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">IsSeries:</span>
              <span className="productInfoValue">{movie.isSeries?'Yes':'No'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label htmlFor="title">Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              name="title"
              onChange={handleChange}
            />

            <label htmlFor="year">Year</label>
            <input
              type="number"
              placeholder={movie.year}
              name="year"
              onChange={handleChange}
            />
            <label htmlFor="title">
              Duration
            </label>
            <input
              type="text"
              placeholder={movie.duration}
              name="duration"
              onChange={handleChange}
            />

            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              name="genre"
              onChange={handleChange}
            />

            <label htmlFor="limit">Limit</label>
            <input
              type="limit"
              placeholder={movie.limit}
              name="limit"
              onChange={handleChange}
            />

            <label htmlFor="trailer">Trailer</label>
            <input
              type="file"
              placeholder={movie.trailer}
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />

            <label htmlFor="video">Video</label>
            <input
              type="file"
              placeholder={movie.video}
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />

<label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
          <option>Choose series</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file" htmlFor="publish">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />

              <button className="productButton" onClick={handleUpload}>
                Upload
              </button>
            </div>

            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>

            {isUpload && (
              <div className="progress">
                <h2>
                  {progress < 100
                    ? `File is uploading....${progress} %`
                    : `File uploaded ${progress} %`}
                </h2>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
