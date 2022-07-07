import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    if (userObject) {
      setUser(JSON.parse(userObject));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser({});
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Book App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-md-auto gap-2">
              {user.username ? (
                <>
                  <li className="nav-item rounded">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <div className="nav-link" onClick={() => logout()}>
                      Logout
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item rounded">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
