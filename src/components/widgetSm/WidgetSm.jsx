import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { getUsers } from "../../context/userContext/apiCalls";

export default function WidgetSm() {
  const {users,dispatch}=useContext(UserContext)

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch]);

  console.log("users", users);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
