import { useState, ChangeEvent, useEffect, FormEvent } from "react";
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
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    e.target.value = value;
    setCpf(value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    setPassword(e.target.value);
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (!cpf || !password) {
      setShowError(true);
      return;
    }

    const cpfSanitized = cpf.replace(/\D/g, "");

    try {
      const response = await autorization({
        cpf: cpfSanitized,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("auth", response.data.token);
        navigate("/transactions-list");
      }
    } catch (error) {
      setShowError(true);
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
          value={cpf}
          maxLength={14}
        />
        <input
          id="password"
          placeholder="Digite sua senha"
          onChange={handleChangePassword}
          type="password"
          value={password}
          maxLength={6}
        />
        {showError && <p>Campos obrigatórios / cpf ou senha inválidos</p>}
        <button onClick={handleAuth}>
          Continuar
          <img src={arrowRightImage} />
        </button>
      </form>
    </main>
  );
}

export default Login;
