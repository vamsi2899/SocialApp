import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../main";


export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    postData("/user/login", "POST", user)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/profile");
        } else {
          console.log(`Error! ${res.message}`);
        }
      })
      .catch((error) => {
        console.log(`Error! ${error.message}`);
        // alert.call()
      });
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="login-container">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Log In</h3>
          <div className="card-text">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  name="email"
                  onChange={onChange}
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
                  name="password"
                  onChange={onChange}
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
