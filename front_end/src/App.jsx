import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Toast from "./components_temp/Toast";
function App() {
  const [user, setUser] = useState(null); // cria o estado do usuário
  const [loading, setLoading] = useState(true); // esperar o carregamento terminar antes de exibir as rotas

  // console.log("Usuário logado", user);

  // Verifica se há um usuário salvo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // só após checar o localStorage
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // ou spinner, etc
  }

  return (
    <div className="app_components">
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />}>
          {" "}
          {/* passa a função para Login */}
        </Route>
        <Route
          path="/home"
          element={user ? <Home user={user} /> : <Navigate to="/" />}
        ></Route>
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
