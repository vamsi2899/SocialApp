import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Log In</h3>
          <div className="card-text">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  required
                />
              </div>
              <center>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Sign in
                </button>
              </center>

              <div className="sign-up">
                Don't have an account? <Link to="/register">Create One</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
