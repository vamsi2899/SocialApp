import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    if (!userObject) navigate("/login");
    else navigate("/profile");
  }, [navigate]);

  return (
    <div>
      <div></div>
    </div>
  );
}
