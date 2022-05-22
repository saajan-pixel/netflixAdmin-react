import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/authContex";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1>Login to your account</h1>
        <form autoComplete="off">
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="input"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              className="input"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="login-btn"
            disabled={isFetching}
            onClick={handleLogin}
            type="submit"
          >
            Login
          </button>
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
