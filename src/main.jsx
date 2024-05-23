import React from "react";
import ReactDOM from "react-dom/client";
import App from "./frameworkUI/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { loaderReducer } from "./utilities/redux/LoaderReducer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
const store = createStore(loaderReducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
