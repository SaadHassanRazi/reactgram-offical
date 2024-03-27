import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loaders from "../components/Loaders";
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
            className="border border-primary h-10 text-cyan-700 focus:border-violet-300 rounded-md pl-5"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border border-primary h-10 text-cyan-700 focus:border-violet-600 rounded-md pl-5"
          />

          <div className="flex justify-end">
            <button
              className="h-10 px-10 bg-primary rounded-md"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
          <hr />
          <Link to={"/register"} className="text-[14px] text-primary">
            NOT YET REGISTERED ? CLICK HERE TO REGISTER
          </Link>
        </div>
        <div className="bg-primary w-64  rounded py-10 text-center">
          <h1 className="font-extrabold hover:text-white text-xl">Gram</h1>
        </div>
      </div>
    </>
  );
};

export default Login;
