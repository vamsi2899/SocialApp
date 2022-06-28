import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login.";
import Register from "./components/register";
import Navbar from "./layout/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
