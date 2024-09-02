import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loaders from "../components/Loaders";
import LoginImage from "../img/undraw_secure_login_pdn4.svg";
import {
  EnvelopeArrowDownFill,
  LockFill,
  Toggle2On,
} from "react-bootstrap-icons";
import { ThemeContext } from "../../utilities/themeContext/ThemeContext";
const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    dispatch({ type: "showLoading" });
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        getDoc(doc(fireDb, "users", user.uid)).then((user) => {
          localStorage.setItem(
            "reactgram-offical-user",
            JSON.stringify({ ...user.data(), id: user.id })
          );
          toast.success("Login Success");
          navigate("/");
          dispatch({ type: "hideLoading" });
        });
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch({ type: "hideLoading" });
      });
  };
  useEffect(() => {
    if (localStorage.getItem("reactgram-offical-user")) {
      navigate("/");
    }
  }, []);
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

        {loading && <Loaders />}

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
            <img
              src={LoginImage}
              className="img-fluid w-50 d-flex mx-auto mx-lg-0"
              alt=""
            />
          </div>
          <div className="col-lg">
            <div className="">
              <h1 className="text-4xl text-primary font-semibold">
                Member login
              </h1>
              <hr />
              <div className="input-group my-2">
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
                  className={`form-control form-control-lg ${
                    isDarkMode ? "bg-white text-dark" : " text-dark"
                  } rounded-md pl-5`}
                />
              </div>
              <div className="input-group">
                <div className="input-group-text">
                  <LockFill className="m-auto" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={`form-control form-control-lg ${
                    isDarkMode ? "bg-white text-dark" : "text-dark"
                  } rounded-md pl-5`}
                />
              </div>

              <div className="">
                <button
                  className="btn btn-primary my-2 d-flex mx-auto"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              </div>
              <hr />
              <Link to={"/register"} className="text-[14px] text-primary  ">
                NOT YET REGISTERED ? CLICK HERE TO REGISTER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
