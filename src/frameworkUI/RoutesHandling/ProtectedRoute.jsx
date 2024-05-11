import React     from "react";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("reactgram-offical-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
