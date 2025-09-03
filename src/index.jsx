import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Register from "./Register.jsx";
import SignIn from "./SignIn.jsx";
import Dashboard from "./Dashboard.jsx";

window.showActionSheet = function (id, title, message, autoCloseMs, onClose) {
  try {
    const el = document.getElementById(id);
    if (!el) return;
    const titleEl =
      el.querySelector(".menu-title h1") ||
      el.querySelector(".menu-title h2") ||
      el.querySelector(".menu-title p");
    const pEl = el.querySelector(".menu-title p");
    if (titleEl) titleEl.textContent = title || titleEl.textContent;
    if (pEl) pEl.textContent = message || pEl.textContent;
    el.classList.add("menu-active");
    const hider = document.querySelectorAll(".menu-hider")[0];
    if (hider) hider.classList.add("menu-active");
    if (autoCloseMs) {
      setTimeout(() => {
        el.classList.remove("menu-active");
        if (hider) hider.classList.remove("menu-active");
        if (typeof onClose === "function") onClose();
      }, autoCloseMs);
    }
  } catch (err) {
    console.error("showActionSheet error", err);
  }
};

// Navigate helper that supports pathname (history API) and hash fallback
window.navigateTo = function (path) {
  try {
    if (path.startsWith("#")) {
      window.location.hash = path.replace(/^#/, "");
    } else if (path.startsWith("/")) {
      history.pushState({}, "", path);
      // dispatch a popstate so listeners update
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      // plain token
      window.location.hash = path;
    }
  } catch (err) {
    console.error("navigateTo error", err);
  }
};

function App() {
  const [route, setRoute] = useState(getCurrentRoute());

  function getCurrentRoute() {
    // prefer pathname if not root
    const p = window.location.pathname;
    if (p && p !== "/" && p !== "") return p.replace(/^\//, "");
    // fallback to hash
    return (
      (window.location.hash && window.location.hash.replace("#", "")) ||
      "register"
    );
  }

  useEffect(() => {
    function update() {
      setRoute(getCurrentRoute());
    }
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  if (route === "signin") return <SignIn />;
  if (route === "dashboard") return <Dashboard />;
  return <Register />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
