import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toast from "./components/Toast.jsx"; // ⬅️ seu container

function App() {
  return (
    <div className="app_components">
      <BrowserRouter>
        <Toast /> {/* ⬅️ precisa existir 1 vez no app inteiro */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
