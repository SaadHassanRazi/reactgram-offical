import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./RoutesHandling/Routes";
import { ThemeContext } from "../utilities/themeContext/ThemeContext";
import { ThemeProvider } from "../utilities/themeContext/ThemeContext";
const App = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
