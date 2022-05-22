import "./editList.css";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../Url";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import { MovieContext } from "../../context/movieContext/movieContext";
import { getMovies } from "../../context/movieContext/movieApi";
import {useHistory} from 'react-router-dom'

const EditList = () => {
  const params = useParams();
  const listId = params.listId;
  const [list, setList] = useState({});
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history=useHistory()

  useEffect(() => {
    let mounted = true;
    const getListById = async () => {
      try {
        const res = await axios.get(`${api_url}lists/find/${listId}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (mounted) {
          setList(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getListById();
    getMovies(dispatchMovie);

    return () => (mounted = false);
  }, [listId, dispatchMovie]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(listId, list, dispatch);
    history.push('/lists')
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
 
    console.log(e.target.selectedOptions);
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setList({ ...list, [e.target.name]: value });
  };

  console.log('list',list)

  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="div">
        <h1 className="productTitle">List</h1>
        <button className="productButton" onClick={()=> history.goBack()}>Cancel</button>
        </div>
     
      </div>

      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder={list.title}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              onChange={handleChange}
              placeholder={list.type}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              onChange={handleChange}
              placeholder={list.genre}
            />
            <label>Content</label>
            
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditList;
