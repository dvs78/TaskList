import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div>
      Olá mundo
      <FontAwesomeIcon icon={faHouseChimney} />
    </div>
  );
};

export default Header;
