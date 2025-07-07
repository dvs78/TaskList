import React, { useState } from "react";
import { usuario } from "../../assets/database/usuario.js";
import { notificar } from "../../Components/Toast.jsx";
const Login = () => {
  const [senha, setSenha] = useState("");
  const handleLogin = () => {
    const userFind = usuario.find((f) => f.senha === senha);

    if (userFind) {
      notificar("sucesso", `Bem-vindo, ${userFind.nome}!`);
      console.log("usuario encontrado", userFind);
    } else {
      notificar("erro", "Usuário não foi encontrado");
    }

    //  else notificar("erro", "usuario não foi encontrado");
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
