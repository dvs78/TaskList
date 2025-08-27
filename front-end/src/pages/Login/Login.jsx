import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // import para navegação

const Login = () => {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // hook do react-router

  const handleLogin = () => {
    // Aqui você pode validar a senha
    if (senha === "1234") {
      // Se a senha estiver certa, vai para Home
      navigate("/home");
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="login__container">
      <h1>Login</h1>
      <label className="label__login" htmlFor="input__login">
        Digite sua senha:
      </label>
      <input
        type="password"
        name="input__login"
        placeholder="senha"
        value={senha}
        onChange={(e) => {
          setSenha(e.target.value);
        }}
      />
      <button className="btn__enter" onClick={handleLogin}>
        <h3>Entrar</h3>
      </button>
    </div>
  );
};

export default Login;
