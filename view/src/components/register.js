import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingWidget from "../layout/loading_widget";
import { postData } from "../main";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    postData("/user/register", "POST", user)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/profile");
        }
      })
      .catch((error) => {
        setLoading(false);

        console.log(`Error! ${error.message}`);
      });
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="login-container">
      <LoadingWidget loading={loading} />
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Create Account</h3>
          <div className="card-text">
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
                  name="username"
                  onChange={onChange}
                  required
                />
              </div>

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
