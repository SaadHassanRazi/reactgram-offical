import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./RoutesHandling/Routes";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </>
  );
};

export default App;
