import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
    <Navbar expand="lg" bg="dark" className="rounded" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>ReactGram</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {menu.map((item) => {
              return (
                <Link
                  to={item.path}
                  className={`nav-link  ${
                    item.path === location.pathname
                      ? "border bg-white  text-dark rounded"
                      : "text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
            <h1
              className="nav-link m-auto cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </h1>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
