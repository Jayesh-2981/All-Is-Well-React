import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Register from "./Register.jsx";
import SignIn from "./SignIn.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [route, setRoute] = useState(
    (window.location.hash && window.location.hash.replace("#", "")) ||
      "register"
  );

  useEffect(() => {
    function onHash() {
      setRoute(
        (window.location.hash && window.location.hash.replace("#", "")) ||
          "register"
      );
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "signin") return <SignIn />;
  if (route === "dashboard") return <Dashboard />;
  return <Register />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
