import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome"; // ajuste o caminho

const Login = () => {
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioValido, setUsuarioValido] = useState(null); // guarda o usuário logado
  const [mostrarBV, setMostrarBV] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const requisicaoGet = async () => {
      const { data } = await axios.get("http://localhost:3000/api/login");
      setUsuarios(data);
    };
    requisicaoGet();
  }, []);

  const handleLogin = () => {
    const usuario = usuarios.find((u) => u.senha === senhaDigitada);
    if (usuario) {
      setUsuarioValido(usuario);
      setMostrarBV(true); // abre modal
      // navega depois do modal fechar (onClose do Welcome)
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
        value={senhaDigitada}
        onChange={(e) => setSenhaDigitada(e.target.value)}
      />
      <button className="btn__enter" onClick={handleLogin}>
        <h3>Entrar</h3>
      </button>

      {/* Modal de Boas-Vindas */}
      {mostrarBV && (
        <Welcome
          nome={usuarioValido?.nome}
          duration={2600} // 2.6s na tela
          onClose={() => {
            setMostrarBV(false);
            navigate("/home", { state: { usuario: usuarioValido.nome } }); // só navega quando fechar
          }}
        />
      )}
    </div>
  );
};

export default Login;
