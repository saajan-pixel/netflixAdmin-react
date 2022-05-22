import "./Lists.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import {deleteList, getAllLists } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";

export default function Lists() {
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllLists(dispatch);
    }

    return () => (mounted = false);
  }, [dispatch]);

  console.log("users", lists);
  const handleDelete = (id) => {
    console.log("id",id)
    deleteList(id, dispatch);
  };



  return (
    <div className="userList">
      <Link to='/newList' className="link">
      <button className="btn btn-primary float-right">Add List</button>
      </Link>
     
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list._id}>
              <th scope="row">{list._id}</th>
              <td>{list.title}</td>
              <td>{list.genre}</td>
              <td>{list.type}</td>
              <td>
                <Link to={"/list/" + list._id}>
                  <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(list._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
