import { useNavigate } from "react-router-dom";
import "./index.css";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/ibanking");
  };

  return (
    <button onClick={handleLogout} className="logout__button">
      Sair
    </button>
  );
}

export default LogoutButton;
