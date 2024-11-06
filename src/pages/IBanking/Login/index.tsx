import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";

import "./index.css";
import autorization from "../../../services/autorization/autorization";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    cpf: "",
    password: "",
  });
  const [showError, setShowError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      navigate("/transactions-list");
    }
  }, [navigate]);

  const handleChangeCPF = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError('');
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = value;
    setUserData({ ...userData, cpf: value });
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError('');
    setUserData({ ...userData, password: e.target.value });
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!userData.cpf || !userData.password) {
      setShowError("Campos obrigatórios");
      return;
    }

    const cpfSanitized = userData.cpf.replace(/\D/g, "");

    try {
      const response = await autorization({
        cpf: cpfSanitized,
        password: userData.password,
      });

      if (response.data.token) {
        localStorage.setItem("auth", response.data.token);
        navigate("/transactions-list");
      }
    } catch (error) {
      setShowError('Dados incorretos');
    }
  };

  return (
    <main id="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <h1>Fazer LogIn</h1>
      <form>
        <input
          id="cpf"
          placeholder="Insira seu CPF"
          onChange={handleChangeCPF}
          value={userData.cpf}
          maxLength={14}
        />
        <input
          id="password"
          placeholder="Digite sua senha"
          onChange={handleChangePassword}
          type="password"
          value={userData.password}
          maxLength={6}
        />
        <p>{showError}</p>
        <button onClick={handleAuth}>
          Continuar
          <img src={arrowRightImage} />
        </button>
      </form>
    </main>
  );
}

export default Login;
