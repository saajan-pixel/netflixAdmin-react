import "./userList.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUsers(dispatch);
    }

    return () => (mounted = false);
  }, [dispatch]);

  console.log("users", users);
  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  return (
    <div className="userList">
     
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">ProfilePic</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.username}</td>
              <td>
           
                <div className="userListUser">
                  <img className="userListImg" src={user.profilePic} alt="" />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.isAdmin?'Yes':'No'}</td>
              <td>
                <Link to={"/user/" + user._id}>
                  <button className="userListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="userListDelete"
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
