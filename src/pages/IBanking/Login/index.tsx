import { useState, ChangeEvent, useEffect } from "react";
import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";

import "./index.css";
import autorization from "../../../services/autorization/autorization";
import { useNavigate } from "react-router-dom";

function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      navigate("/transactions-list");
    }
  }, [navigate]);

  const handleChangeCPF = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setCpf(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setPassword(e.target.value);
  };

  const handleAuth = async () => {
    if (!cpf || !password || cpf !== "35819357833" || password !== "123456") {
      setShowError(true);
      return;
    }
    try {
      const response = await autorization({
        cpf,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("auth", response.data.token);
        navigate("/transactions-list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main id="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <h1>Fazer LogIn</h1>
      <input id="cpf" placeholder="Insira seu CPF" onChange={handleChangeCPF} />
      <input
        id="password"
        placeholder="Digite sua senha"
        onChange={handleChangePassword}
        type="password"
      />
      {showError && <p>Campos obrigatórios / cpf ou senha invalidos</p>}
      <button onClick={handleAuth}>
        Continuar
        <img src={arrowRightImage} />
      </button>
    </main>
  );
}

export default Login;
