import logo from "../images/logo.svg";
import { Route, Link, useHistory } from "react-router-dom";

function Header({ userData, getOut }) {
  const history = useHistory();

  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      <div className="header__box">
        <Route exact path="/">
          <p className="header__userEmail">{userData.email}</p>
          <p className="header__link" onClick={getOut}>
            Выйти
          </p>
        </Route>
        <Route path="/signup">
          <Link className="header__link header__link_auth" to="signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link header__link_auth" to="signup">
            Регистрация
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
