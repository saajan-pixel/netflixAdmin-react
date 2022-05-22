import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { api_url } from "../../Url";
import "./user.css";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/userContext";

export default function User() {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState({});
  const [data, setData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const {dispatch}=useContext(UserContext)
const history=useHistory()
  const handleChange = (e) => {
    let value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  useEffect(() => {
    let mounted = true;
    const getUser = async () => {
      try {
        const res = await axios.get(`${api_url}users/find/${userId}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (mounted) {
          setUser(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUser();

    return () => (mounted = false);
  }, [userId]);

  const upload=(items)=>{
    console.log(profilePic)
    setIsUpload(true);
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



  const handleUpload=(e)=>{
    e.preventDefault()
   upload([
     {file:profilePic,label:'profilePic'}
   ])
  }

  console.log("updateuser",data)

  const handleUpdate=(e)=>{
    e.preventDefault()
    updateUser(userId,data,dispatch)
    history.push('/users')
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <button className="productAddButton" onClick={()=> history.goBack()}>Cancel</button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.profilePic} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit User</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label htmlFor="admin">isAdmin</label>
                <select id="admin" onChange={handleChange} name="isAdmin">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.profilePic} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" name="profilePic" onChange={(e)=> setProfilePic(e.target.files[0])}/>
                <button className="userUpdateButton" type="button" onClick={handleUpload}>Upload</button>
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
              <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
