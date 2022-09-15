import * as auth from "../utils/Auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ userAuthorization }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();
    userAuthorization(email, password);
  }

  return (
    <>
      <form className="authForm" onSubmit={handleSubmit}>
        <h2 className="authForm__title">Вход</h2>
        <input
          className="authForm__input authForm__input_email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
        ></input>
        <input
          className="authForm__input authForm__input_password"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
        <button type="submit" className="authForm__button">
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;
