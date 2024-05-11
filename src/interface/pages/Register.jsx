import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from "../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Loaders from "../components/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  return (
    <>
      <div className="h-full text-white flex-col flex justify-between items-center bg-black">
        {loading && <Loaders />}
        <div className=" bg-primary  transition-all w-64 mt-10 rounded py-10 text-center">
          <h1 className="font-extrabold  text-xl ">React</h1>
        </div>
        <div className="w-96 flex flex-col space-y-5 card p-10">
          <h1 className="text-4xl text-primary font-semibold">Get---In</h1>
          <hr />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border text-cyan-700 border-primary h-10 focus:border-violet-300 rounded-md pl-5"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border text-cyan-700 border-primary h-10 focus:border-violet-600 rounded-md pl-5"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="border text-cyan-700 border-primary h-10 focus:border-violet-600 rounded-md pl-5"
          />
          <div className="flex justify-end">
            <button
              className="h-10 px-10 bg-primary rounded-md"
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
        <div className="bg-primary w-64  rounded py-10 text-center">
          <h1 className="font-extrabold hover:text-white text-xl">Gram</h1>
        </div>
      </div>
    </>
  );
};

export default Register;
