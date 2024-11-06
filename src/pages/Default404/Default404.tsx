import CoraLogo from "../../assets/logo.svg";
import './Default404.css'

function Default404() {
  return (
    <div className="default__404">
      <img src={CoraLogo} alt="404" />
      <h1>404</h1>
      <h2>Página não encontrada</h2>
    </div>
  );
}

export default Default404;
