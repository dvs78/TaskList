import React, { useState, useEffect } from "react";
import { notificar } from "../../components/Toast";
import { getLogin } from "../../../api_front/login.js";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  // recebe a prop (função) do App
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!senha) {
      return notificar("erro", "Informe a senha");
    }

    const usuario = await getLogin();
    const userFind = usuario.find((f) => f.senha === senha);

    if (userFind) {
      notificar("sucesso", `Bem-vindo, ${userFind.nome}!`);
      setUser(userFind); // envia para app
      localStorage.setItem("user", JSON.stringify(userFind)); // 👈 salva
      navigate("/home"); // redireciona para /home
    } else {
      notificar("erro", "Senha inválida");
    }

    setSenha("");
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
