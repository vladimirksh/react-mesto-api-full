import React, { useContext } from "react";
import { Link, useHistory, Route } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header(props) {
  const currentUser = useContext(CurrentUserContext);

  const history = useHistory();

  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sing-in");
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Route>

      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>

      <Route path="/main">
        <div className="header__logout">
          <address className="header__user-email">{currentUser.email}</address>
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
