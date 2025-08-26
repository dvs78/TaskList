import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header">
      <FontAwesomeIcon icon={faCircleLeft} />
      <h1>Daniel</h1>
      <FontAwesomeIcon icon={faHouseChimney} />
    </header>
  );
};

export default Header;
