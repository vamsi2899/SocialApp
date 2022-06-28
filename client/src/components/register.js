import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="login-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Create Account</h3>
          <div className="card-text">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
                  required
                />
              </div>

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
                  Create Account
                </button>
              </center>

              <div className="sign-up">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
