// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // import para navegação
// import axios from "axios";

// const Login = () => {
//   const [senha, setSenha] = useState("");
//   const navigate = useNavigate(); // hook do react-router

//   const handleLogin = () => {
//     // Aqui você pode validar a senha
//     if (senha === "0000") {
//       // Se a senha estiver certa, vai para Home
//       navigate("/home");
//     } else {
//       alert("Senha incorreta!");
//     }

//     const requisicaoGet = async () => {
//       const { data } = await axios.get("http://localhost:3000/"); // baseURL + /api/login
//       const findSenha = data.find((l) => {
//         l.senha === senha;
//       });
//       console.log(findSenha);
//       return findSenha;
//     };
//     requisicaoGet();
//   };

//   return (
//     <div className="login__container">
//       <h1>Login</h1>
//       <label className="label__login" htmlFor="input__login">
//         Digite sua senha:
//       </label>
//       <input
//         type="password"
//         name="input__login"
//         placeholder="senha"
//         value={senha}
//         onChange={(e) => {
//           setSenha(e.target.value);
//         }}
//       />
//       <button className="btn__enter" onClick={handleLogin}>
//         <h3>Entrar</h3>
//       </button>
//     </div>
//   );
// };

// export default Login;

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
        const { data } = await axios.get("http://localhost:3000/"); // baseURL + /api/login
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
