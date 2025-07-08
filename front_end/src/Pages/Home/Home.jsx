import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificar } from "../../Components/Toast";
import Header from "../../Components/Header";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!user) {
      notificar("erro", "Usuário não está logado");
      navigate("/"); // redireciona automaticamente
    } else {
      setUserName(user.nome);
    }
  }, [user, navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  return (
    <>
      <Header user={user} />
      {/* <h1>Bem-vindo{userName && `, ${userName}`}!</h1>
      <p>Você está autenticado no sistema.</p> */}
      {/* <button className="btn__logout" onClick={handleLogout}>
        Sair
      </button> */}
    </>
  );
};

export default Home;
