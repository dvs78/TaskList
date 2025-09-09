import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faCircleLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = ({ userName }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/"); // volta para tela de login
  };

  return (
    <header className="header">
      <h1>{userName}</h1>

      <div className="header__icons">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={handleLogout}
          style={{ marginLeft: "15px", cursor: "pointer" }}
          title="Sair"
        />
      </div>
    </header>
  );
};

export default Header;
