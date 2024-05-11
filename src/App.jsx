import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./frameworkUI/Routes";
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
