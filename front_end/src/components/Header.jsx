import React from "react";
import Logout from "./Logout";
// import "./Header.css"; // caso queira customizar

const Header = ({ user, handleLogout }) => {
  return (
    <header className="header">
      <h1>{user.nome}</h1>

      {user && (
        <div className="header__usuario">
          {/* <span className="header__nome">
            Olá, <strong>{usuarioLogado.nome}</strong>
          </span> */}
          <Logout handleLogout={handleLogout} />
        </div>
      )}
    </header>
  );
};

export default Header;
