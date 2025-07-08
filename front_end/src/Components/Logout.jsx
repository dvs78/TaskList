import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <button className="btn__logout" onClick={handleLogout}>
      Sair
    </button>
  );
};

export default Logout;
