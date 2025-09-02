import React from "react";

export default function Register() {
  return (
    <div className="header-clear-medium">
      <div className="card card-style">
        <div className="content">
          <p className="font-600 color-highlight mb-n1">Free Accounts</p>
          <h1 className="font-30">Sign Up</h1>
          <p>Create an account, it's free and gives you tones of benefits!</p>

          <div className="input-style no-borders has-icon validate-field mb-4">
            import React from 'react'

            export default function Register() {
              return (
                <div className="header-clear-medium">

                  <div className="card card-style">
                    <div className="content">
                      <p className="font-600 color-highlight mb-n1">Free Accounts</p>
                      <h1 className="font-30">Sign Up</h1>
                      <p>
                        Create an account, it's free and gives you tones of benefits!
                      </p>

                      <div className="input-style no-borders has-icon validate-field mb-4">
                        <i className="fa fa-user"></i>
                        <input type="text" className="form-control validate-name" id="form1ab" placeholder="Username" />
                        <label htmlFor="form1ab" className="color-highlight">Username</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                      </div>

                      <div className="input-style no-borders has-icon validate-field mb-4">
                        <i className="fa fa-at"></i>
                        <input type="email" className="form-control validate-email" id="form1ac" placeholder="Email Address" />
                        <label htmlFor="form1ac" className="color-highlight">Email Address</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                      </div>

                      <div className="input-style no-borders has-icon validate-field mb-4">
                        <i className="fa fa-lock"></i>
                        <input type="password" className="form-control validate-password" id="form1ad" placeholder="Choose Password" />
                        <label htmlFor="form1ad" className="color-highlight">Choose Password</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                      </div>

                      <div className="input-style no-borders has-icon validate-field mb-4">
                        <i className="fa fa-lock"></i>
                        <input type="password" className="form-control validate-password" id="form1ae" placeholder="Confirm Password" />
                        <label htmlFor="form1ae" className="color-highlight">Confirm Password</label>
                        <i className="fa fa-times disabled invalid color-red-dark"></i>
                        <i className="fa fa-check disabled valid color-green-dark"></i>
                        <em>(required)</em>
                      </div>

                      <a href="#" data-back-button className="btn btn-full btn-l font-600 font-13 gradient-highlight mt-4 rounded-s">Create Account</a>

                      <div className="row pt-3 mb-3">
                        <div className="col-6 text-start">
                          <a href="page-system-forgot-1.html">Forgot Password?</a>
                        </div>
                        <div className="col-6 text-end">
                          <a href="page-system-signin-1.html">Sign In Here</a>
                        </div>
                      </div>

                      <div className="divider"></div>

                      <a href="#" className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-facebook mt-4 rounded-s"><i className="fab fa-facebook-f text-center"></i>Sign up with Facebook</a>
                      <a href="#" className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-twitter mt-2 rounded-s"><i className="fab fa-twitter text-center"></i>Sign up with Twitter</a>
                      <a href="#" className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-dark-dark mt-2 rounded-s"><i className="fab fa-apple text-center"></i>Sign up with Apple</a>

                    </div>
                  </div>

                  <div data-menu-load="menu-footer.html"></div>

                </div>
              )
            }
            <div className="col-6 text-end">
              <a href="page-system-signin-1.html">Sign In Here</a>
            </div>
          </div>

          <div className="divider"></div>

          <a
            href="#"
            className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-facebook mt-4 rounded-s"
          >
            <i className="fab fa-facebook-f text-center"></i>Sign up with
            Facebook
          </a>
          <a
            href="#"
            className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-twitter mt-2 rounded-s"
          >
            <i className="fab fa-twitter text-center"></i>Sign up with Twitter
          </a>
          <a
            href="#"
            className="btn btn-icon text-start btn-full btn-l font-600 font-13 bg-dark-dark mt-2 rounded-s"
          >
            <i className="fab fa-apple text-center"></i>Sign up with Apple
          </a>
        </div>
      </div>

      <div data-menu-load="menu-footer.html"></div>
    </div>
  );
}
