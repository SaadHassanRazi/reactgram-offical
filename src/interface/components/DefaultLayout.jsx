import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Loaders from "./Loaders";

function DefaultLayout(props) {
  const { loading } = useSelector((store) => store);
  return (
    <>
      <div className="container border">
        {loading && <Loaders />}
        <Header />
        <div className="mt-3">{props.children}</div>
      </div>
    </>
  );
}

export default DefaultLayout;
