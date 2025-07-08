import React, { useState, useEffect } from "react";
import { notificar } from "../../Components/Toast.jsx";
import { buscarLogins } from "../../../api_front/login.js";

const Login = () => {
  const [senha, setSenha] = useState("");
  const [userLoggedd, setUserLoggedd] = useState(null);

  const handleLogin = async () => {
    if (!senha) {
      return notificar("erro", "Informe a senha");
    }

    const usuario = await buscarLogins();
    const userFind = usuario.find((f) => f.senha === senha);

    if (userFind) {
      notificar("sucesso", `Bem-vindo, ${userFind.nome}!`);
      setUserLoggedd(userFind);
    } else {
      notificar("erro", "Usuário não foi encontrado");
    }

    setSenha("");
  };

  // 👇 Sempre que userLoggedd mudar, exibe no console
  useEffect(() => {
    if (userLoggedd) {
      console.log("Usuário logado:", userLoggedd);
    }
  }, [userLoggedd]);

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
