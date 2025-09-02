import React, { useState, useRef } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    // placeholder: wire Firebase auth here later
    // on success redirect to dashboard
    window.location.hash = "dashboard";
  }

  return (
    <div className="header-clear-medium">
      <div className="card card-style">
        <div className="content">
          <p className="font-600 color-highlight mb-n1">Welcome Back</p>
          <h1 className="font-30">Sign In</h1>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-at"></i>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="color-highlight">Email Address</label>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="color-highlight">Password</label>
            </div>

            <a
              href="#"
              data-back-button=""
              className="btn btn-full btn-l font-600 font-13 gradient-highlight mt-4 rounded-s"
              onClick={(e) => {
                e.preventDefault();
                if (formRef.current) {
                  if (typeof formRef.current.requestSubmit === "function") {
                    formRef.current.requestSubmit();
                  } else {
                    formRef.current.submit();
                  }
                }
              }}
            >
              Create Account
            </a>
          </form>

          <div className="row pt-3 mb-3">
            <div className="col-6 text-start">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  // no action for forgot password per requirements
                }}
              >
                Forgot Password?
              </a>
            </div>
            <div className="col-6 text-end">
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = "register";
                }}
              >
                Create account
              </a>
            </div>
          </div>

          <div className="divider mb-3"></div>
          <div className="text-center">
            <a
              href="#"
              className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-google rounded-s"
              onClick={(e) => {
                e.preventDefault();
                // placeholder for Google sign-in
                window.location.hash = "dashboard";
              }}
            >
              <i className="fab fa-google text-center"></i>
              Sign in with Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
