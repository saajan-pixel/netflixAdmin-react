import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AuthContextProvider } from "./context/authContext/authContex";
import { ListContextProvider } from "./context/listContext/listContext";
import { MovieContextProvider } from "./context/movieContext/movieContext";
import { UserContextProvider } from "./context/userContext/userContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <UserContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </UserContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
