import { useState, useEffect, useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EnvelopeArrowDownFill, Toggle2On } from "react-bootstrap-icons";
import { ThemeContext } from "../../utilities/themeContext/ThemeContext";
import LoginImage from "../img/undraw_secure_login_pdn4.svg";

const Register = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = () => {
    dispatch({ type: "showLoading" });
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const userData = {
          email: user.email,
          profilePicUrl: "",
          bio: "Hi, I am using Reactgram",
        };
        setDoc(doc(fireDb, "users", user.uid), userData);
        // ...
        toast.success("Register Success");
        dispatch({ type: "hideLoading" });
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch("hideLoading");
        // ..
      });
    useEffect(() => {
      if (localStorage.getItem("reactgram-offical-user")) {
        navigate("/");
      }
    });
  };
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div
        className="text-white"
        style={{
          backgroundColor: isDarkMode ? "black" : "white",
          color: isDarkMode ? "white" : "black",
        }}
      >
        <button
          className="btn btn-primary d-flex mx-auto "
          data-bs-toggle="tooltip"
          data-bs-placement="down"
          title="Change Theme"
          onClick={toggleTheme}
        >
          <Toggle2On />
        </button>
        <div
          className="row container mx-auto"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-lg">
            {" "}
            <div className="">
            <img
              src={LoginImage}
              className="img-fluid w-50 d-flex mx-auto mx-lg-0"
              alt=""
            />
            </div>
          </div>
          <div className="col-lg">
            <h1 className="text-4xl text-primary font-semibold">
              !Member Register
            </h1>
            <hr />
            <div className="input-group">
              <div className="input-group-text">
                <EnvelopeArrowDownFill className="m-auto" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border form-control form-control-lg rounded-md pl-5"
              />
            </div>
            <div className="input-group my-2">
              <div className="input-group-text">
                <EnvelopeArrowDownFill className="m-auto" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border form-control form-control-lg rounded-md pl-5"
              />
            </div>
            <div className="input-group">
              <div className="input-group-text">
                <EnvelopeArrowDownFill className="m-auto" />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="border form-control form-control-lg rounded-md pl-5"
              />
            </div>
            <div className="my-2">
              <button
                className="btn btn-primary d-flex mx-auto"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
            <hr />
            <Link to={"/login"} className="text-[14px] text-primary">
              ALREADY REGISTERED ? CLICK HERE TO LOGIN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
