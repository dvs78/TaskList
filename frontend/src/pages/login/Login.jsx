import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../../components/Welcome";
// import { notificar } from "../../components/Toast.jsx"; // se quiser usar toast

const Login = () => {
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioValido, setUsuarioValido] = useState(null);
  const [mostrarBV, setMostrarBV] = useState(false);
  const [loading, setLoading] = useState(false); // 👈
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/"); // baseURL + /api/login
        setUsuarios(data || []);
      } catch (error) {
        console.error("Falha ao buscar /login:", error.message);
        alert("Não foi possível conectar ao servidor. Verifique o back-end.");
        // notificar("erro", "Não foi possível conectar ao servidor.");
      }
    })();
  }, []);

  const handleLogin = () => {
    if (loading) return;
    const senha = (senhaDigitada || "").trim();
    if (!senha) {
      alert("Digite a senha.");
      // notificar("alerta", "Digite a senha.");
      return;
    }

    setLoading(true);
    const usuario = usuarios.find((u) => u.senha === senha);

    if (usuario) {
      setUsuarioValido(usuario);
      setMostrarBV(true);
    } else {
      alert("Senha incorreta!");
      // notificar("erro", "Senha incorreta!");
    }
    setSenhaDigitada("");
    setLoading(false);
  };

  return (
    <div className="login__container">
      <h1>Login</h1>

      <label className="label__login" htmlFor="input__login">
        Digite sua senha:
      </label>

      <input
        id="input__login"
        className="input__login"
        type="password"
        placeholder="senha"
        autoComplete="new-password"
        value={senhaDigitada}
        onChange={(e) => setSenhaDigitada(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />

      <button className="btn__enter" onClick={handleLogin} disabled={loading}>
        <h3>{loading ? "Entrando..." : "Entrar"}</h3>
      </button>

      {mostrarBV && (
        <Welcome
          nome={usuarioValido?.nome}
          duration={2600}
          onClose={() => {
            setMostrarBV(false);
            navigate("/home", { state: { usuario: usuarioValido } });
          }}
        />
      )}
    </div>
  );
};

export default Login;
