import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Loaders from "./Loaders";

function DefaultLayout(props) {
  const { loading } = useSelector((store) => store);
  return (
    <>
      <div className="container-fluid">
        {loading && <Loaders />}
        <Header />
        <div className="mt-3 ms-auto"s style={{width:'80%'} }>{props.children}</div>
      </div>
    </>
  );
}

export default DefaultLayout;
