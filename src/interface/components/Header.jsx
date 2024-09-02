import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("reactgram-offical-user"));
  const menu = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Add Post",
      path: "/addpost",
    },
    {
      title: "Shares",
      path: "/shares",
    },
    {
      title: "Profile",
      path: `/profile/${user.id}`,
    },
  ];
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("reactgram-offical-user");
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <div
      className="d-flex flex-column vh-100 bg-dark p-3"
      style={{ width: "20%", position: "fixed", top: 0, left: 0 }}
    >
      <div className="mb-4">
        <h2 className="text-white">ReactGram</h2>
      </div>
      <div className="flex-grow-1">
        {menu.map((item) => (
          <Link
            to={item.path}
            className={`d-block py-2 px-3 my-2 nav-link ${
              item.path === location.pathname
                ? "bg-white text-dark rounded"
                : "text-white"
            }`}
            key={item.title}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <h1
        className="nav-link mt-auto py-2 px-3 cursor-pointer text-white"
        onClick={logoutHandler}
      >
        Logout
      </h1>
    </div>
  );
}

export default Header;
