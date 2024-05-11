import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./interface/pages/Home";
import Register from "./interface/pages/Register";
import Login from "./interface/pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AddPost from "./interface/pages/AddPost";
import PostDesc from "./interface/pages/PostDesc";
import SharePost from "./interface/pages/SharePost";
import Shares from "./interface/pages/Shares";
import Profile from "./interface/pages/Profile";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/shares"
            element={
              <ProtectedRoute>
                <Shares />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/sharepost/:id"
            element={
              <ProtectedRoute>
                <SharePost />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <PostDesc />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("reactgram-offical-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
