import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login.";
import Profile from "./components/profile";
import Register from "./components/register";
import Navbar from "./layout/navbar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
