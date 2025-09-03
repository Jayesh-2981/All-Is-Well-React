import React, { useRef } from "react";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Register() {
  const formRef = useRef(null);

  return (
    <div className="header-clear-medium">
      <div className="card card-style">
        <div className="content">
          <p className="font-600 color-highlight mb-n1">Free Accounts</p>
          <h1 className="font-30">Sign Up</h1>
          <p>Create an account, it's free and gives you tones of benefits!</p>

          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const data = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value,
                password: form.password.value,
                confirmPassword: form.confirmPassword.value,
              };
              if (data.password !== data.confirmPassword) {
                window.showActionSheet(
                  "menu-warning-1",
                  "Error",
                  "Passwords do not match"
                );
                return;
              }
              // basic client-side password strength check (Firebase requires >= 6)
              if (data.password.length < 6) {
                window.showActionSheet(
                  "menu-warning-1",
                  "Weak password",
                  "Password must be at least 6 characters long"
                );
                return;
              }
              // Firebase register
              createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                  // user created -> navigate to dashboard immediately
                  window.navigateTo("/dashboard");
                })
                .catch((error) => {
                  console.error("createUser error", error);
                  const msg = (error && error.message) || "Registration failed";
                  const code = (error && error.code) || "";
                  window.showActionSheet(
                    "notification-warning",
                    `Registration failed ${code}`,
                    msg
                  );
                });
            }}
          >
            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                required
              />
              <label className="color-highlight">First Name</label>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                required
              />
              <label className="color-highlight">Last Name</label>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-at"></i>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                required
              />
              <label className="color-highlight">Email Address</label>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Choose Password"
                required
              />
              <label className="color-highlight">Choose Password</label>
            </div>

            <div className="input-style no-borders has-icon validate-field mb-4">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                required
              />
              <label className="color-highlight">Confirm Password</label>
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
                href="#signin"
                onClick={(e) => {
                  e.preventDefault();
                  window.navigateTo("/signin");
                }}
              >
                Sign In Here
              </a>
            </div>
          </div>

          <div className="divider"></div>
          <div className="text-center">
            <a
              href="#"
              className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-google rounded-s"
              onClick={(e) => {
                e.preventDefault();
                signInWithPopup(auth, googleProvider)
                  .then((result) => {
                    // match SignIn behavior: navigate immediately on success
                    window.navigateTo("/dashboard");
                  })
                  .catch((error) => {
                    showActionSheet(
                      "menu-warning-1",
                      "Google sign-in failed",
                      error.message || "Google sign-in failed"
                    );
                  });
              }}
            >
              <i className="fab fa-google text-center"></i>
              Sign in with Google
            </a>
          </div>
        </div>
      </div>

      <div data-menu-load="menu-footer.html"></div>
    </div>
  );
}
